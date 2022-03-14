
import { IDomainEvent } from "./IDomainEvent";
import { Rabbitmq } from "../../infrastructure";

export class DomainEvents {

	public static register(publisherComponent: string, subscriberComponent: string, eventName: string, handler: (event: IDomainEvent) => void,): void {

		Rabbitmq.getInstace().register(publisherComponent, subscriberComponent, eventName, handler);

	}

	public static dispatch(event: IDomainEvent): void {

		Rabbitmq.getInstace().publish(event.componentName, event);

	}
}