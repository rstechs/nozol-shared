import { isEqual } from "lodash";
import { DomainEvents, IDomainEvent } from "../events"


export abstract class Entity {
	private __modifications = new Set();
	protected id?: string;
	abstract validate(param?: any): void;

	protected modify(modifiedAttrs: string | string[]) {
		modifiedAttrs = Array.isArray(modifiedAttrs) ? modifiedAttrs : [modifiedAttrs];

		modifiedAttrs.forEach((item) => this.__modifications.add(item));
	}

	getInitModifications(): { [key: string]: any } {
		const modifications = {};
		for (const [attr, value] of Object.entries(this)) {
			if (this.__modifications.has(attr)) {
				modifications[attr] = value;
			}
		}
		return modifications;
	}

	edit(updates: { [x: string]: any }) {
		const changes = this.getChanges(updates);
		for (const [key, value] of Object.entries(changes)) {
			this[key] = value;
			this.modify(key);
		}

		this.validate();

		return changes;
	}

	getId(): string | undefined {
		return this.id;
	}

	private getChanges(newChanges) {
		const existingSetting = this;
		let changes = {};
		for (let key in newChanges) {
			if (isEqual(newChanges[key], existingSetting[key])) continue;
			changes[key] = newChanges[key];
		}
		return changes;
	}

	public addDomainEvent(domainEvent: IDomainEvent): void {
		DomainEvents.dispatch(domainEvent);
	}

	toJson() {
		const { __modifications, ...obj } = { ...this };
		return obj;
	}
}
