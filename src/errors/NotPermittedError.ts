import { CustomError } from './CustomError';

export class NotPermittedError extends CustomError {

	constructor(message: string, code: string, data?: any, isTrusted = true) {

		super("NotPermittedError", message, code, data, isTrusted);

	}
}