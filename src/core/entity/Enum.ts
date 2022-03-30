export abstract class Enum {
	static __cls: { [x: string]: string[] } = {};

	static entries(): string[][] {
		return Object.entries(this).filter(([k, v]) => !/^__.*/.test(k));
	}

	static values(): string[] {
		return this.entries().map((a) => a[1]);
	}

	static valuesOfClass(someEnumClasses: string | string[]): string[] {
		const enumClasses: string[] = Array.isArray(someEnumClasses)
			? someEnumClasses
			: [someEnumClasses];

		const values: string[] = [];

		for (const [key, value] of Object.entries(this.__cls)) {
			if (enumClasses.some((c) => value.includes(c))) {
				values.push(key);
			}
		}

		return values;
	}

	static fields() {
		return this.values().map((v) => ({ id: v, class: this.__cls[v] }));
	}

	static fieldsOfClass(someEnumClasses: string | string[]) {
		const enumClasses: string[] = Array.isArray(someEnumClasses)
			? someEnumClasses
			: [someEnumClasses];


		return this.values()
			.map((v) => ({ id: v, class: this.__cls[v] }))
			.filter(v => {
				return enumClasses.some((c) => !v.class || v.class.includes(c))
			});
	}

	static includes(someEnums: string | string[]): boolean {
		someEnums = Array.isArray(someEnums) ? someEnums : [someEnums];
		return someEnums.every((enm) => this.values().includes(enm));
	}
}