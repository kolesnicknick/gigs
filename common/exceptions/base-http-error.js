class BaseHttpError {
    constructor(statusCode, error) {
        this.statusCode = statusCode;
        this.error = error;
    }
}

module.exports = BaseHttpError;