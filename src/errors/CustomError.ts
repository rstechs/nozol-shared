export class CustomError extends Error {

	public code: string;
	public data: string;
	public isTrusted: boolean;


	constructor(name: string, message: string, code: string, data: any = {}, isTrusted: boolean) {
		super(message);

		if (!message || !code) {
			throw new Error("CustomError must have message and code fields.");
		}

		this.name = name || "CustomError";
		this.code = code;
		this.data = data;
		this.isTrusted = isTrusted;

		// @ts-ignore
		Error.captureStackTrace(this, this.constructor);
	}
}
