export class APIError extends Error {
    status: number;
    constructor (message, status = 500) {
        super(message);
        this.message = message;
        this.status = status;
        this.name = this.constructor.name;

        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
};
