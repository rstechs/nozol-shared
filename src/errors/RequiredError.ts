import { CustomError } from './CustomError.js';

export class RequiredError extends CustomError {

	constructor(message: string, code: string, data: any, isTrusted = true) {
		super("RequiredError", message, code, data, isTrusted);
	}
}
