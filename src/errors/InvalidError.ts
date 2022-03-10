import { CustomError } from './CustomError.js';

export class InvalidError extends CustomError {

	constructor(message: string, code: string, data?: any, isTrusted = true) {

		super("InvalidError", message, code, data, isTrusted);

	}
}
