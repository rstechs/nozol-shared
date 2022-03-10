import { CustomError } from './CustomError.js';

export class NotFoundError extends CustomError {

	constructor(message: string, code: string, data?: any, isTrusted = true) {

		super("NotFoundError", message, code, data, isTrusted);

	}

}
