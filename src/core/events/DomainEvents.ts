
import { IDomainEvent } from "./IDomainEvent";
//@ts-ignore
import { Rabbitmq } from "../../infrastructure";

export class DomainEvents {

  public static register(publisherComponent: string, subscriberComponent: string, eventName: string, handler: (event: IDomainEvent) => void,): void {

    Rabbitmq.register(publisherComponent, subscriberComponent, eventName, handler)

  }

  public static dispatch(event: IDomainEvent): void {
    const eventName: string = event.constructor.name;
    Rabbitmq.publish(event.componentName, event);
  }
}