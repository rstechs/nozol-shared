
import { IDomainEvent } from "./IDomainEvent";

export interface IHandleEvent {
  setupSubscriptions(): void;
}
