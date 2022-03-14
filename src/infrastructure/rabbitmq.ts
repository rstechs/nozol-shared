#!/usr/bin/env node

import { connect, Options } from 'amqplib';


export class Rabbitmq {

    private channel;
    private static instance: Rabbitmq;

    private constructor() {
    }

    public static getInstace(): Rabbitmq {
        if (!Rabbitmq.instance) {
            Rabbitmq.instance = new Rabbitmq();
        }

        return Rabbitmq.instance;
    }

    public async init(connectionUrl: string | Options.Connect) {

        const conn = await connect(connectionUrl);
        const ch = await conn.createConfirmChannel();
        return this.channel = ch;

    };



    async register(producerName: string, consumerName: string, eventClassName: string, handler) {

        const exchangeName = producerName;
        this.channel.assertExchange(exchangeName, 'topic', { durable: true });

        const queueName = `${producerName}-${consumerName}-${eventClassName}`;
        const q = await this.channel.assertQueue(queueName, { exclusive: false });

        this.channel.prefetch(1);

        const bindingKey = `${producerName}.${eventClassName}`;
        this.channel.bindQueue(q.queue, exchangeName, bindingKey);

        const consumer = async (msg) => {
            const content = JSON.parse(msg.content.toString());
            await handler(content);
            this.channel.ack(msg);
        }
        this.channel.consume(q.queue, consumer, { noAck: false });
    }

    async publish(producerName: string, event) {

        const exchangeName = producerName;
        this.channel.assertExchange(exchangeName, 'topic', { durable: true });
        const eventClassName: string = event.constructor.name;
        const routingKey = `${producerName}.${eventClassName}`;

        this.channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(event)));

    }
}

