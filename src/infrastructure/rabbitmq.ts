#!/usr/bin/env node

import { connect } from 'amqplib';


export class Rabbitmq {

    static async register(producerName: string, consumerName: string, eventClassName: string, handler) {
        //@ts-ignore
        const connection = await connect(sails.config.connections.rabbitmq);


        const channel = await connection.createChannel();

        const exchangeName = producerName;
        channel.assertExchange(exchangeName, 'topic', { durable: true });

        const queueName = `${producerName}-${consumerName}-${eventClassName}`;
        const q = await channel.assertQueue(queueName, { exclusive: false });

        channel.prefetch(1);

        const bindingKey = `${producerName}.${consumerName}.${eventClassName}`;
        channel.bindQueue(q.queue, exchangeName, bindingKey);

        async function consumer(msg) {
            const content = JSON.parse(msg.content.toString());
            await handler(content);
            channel.ack(msg);
        }
        channel.consume(q.queue, consumer, { noAck: false });
    }

    static async publish(producerName: string, event) {
        //@ts-ignore
        const connection = await connect(sails.config.connections.rabbitmq);


        const channel = await connection.createChannel();

        const exchangeName = producerName;
        channel.assertExchange(exchangeName, 'topic', { durable: true });
        const eventClassName: string = event.constructor.name;
        const routingKey = `${producerName}.${eventClassName}`;

        channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(event)));

    }
}

