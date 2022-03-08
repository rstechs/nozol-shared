import { NotFoundError } from "./NotFoundError";
import { NotPermittedError } from "./NotPermittedError";
import { InvalidError } from "./InvalidError";
import { RequiredError } from "./RequiredError";
import { CustomError } from "./CustomError";

// import logger from "../logger";



export class ErrorHandler {

    handleError(err: CustomError) {
        if (Array.isArray(err)) {
            err = err[0];
        }

        let httpStatusCode = 400;
        let errorCode = err.code || 'UNKOWN';

        switch (err.constructor) {
            case InvalidError:
                httpStatusCode = 400;
                break;
            case RequiredError:
                httpStatusCode = 400;
                break;
            case NotPermittedError:
                httpStatusCode = 403;
                break;
            case NotFoundError:
                httpStatusCode = 404;
                break;
        }

        if (!this.isTrustedError(err)) {
            // logger.error(err);
        }


        return {
            httpStatusCode,
            error: {
                code: errorCode,
                message: err.message,
                //@ts-ignore
                data: err.data || err.invalidAttributes || {},
            },
        }
    }

    isTrustedError(err: CustomError) {
        // console.log("instanceof Error", err instanceof Error)
        // console.log("instanceof CustomError", err instanceof CustomError)
        // console.log("instanceof NotPermittedError", err instanceof NotPermittedError)
        return err.isTrusted
    }

}