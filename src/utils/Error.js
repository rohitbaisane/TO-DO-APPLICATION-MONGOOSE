const { ServerErrorCodes } = require("./status-codes");

class AppError extends Error {

    constructor(name, explanation) {
        super();
        this.name = name;
        this.statusCode = ServerErrorCodes.INTERNAL_SERVER_ERROR;
        this.message = "INTERNAL SERVER ERROR";
        this.explanation = explanation;
    }
}

class ClientError extends Error {

    constructor(message, explanation, statusCode) {
        super();
        this.name = "BAD CLIENT REQUESET";
        this.message = message;
        this.statusCode = statusCode;
        this.explanation = explanation;
    }

}

module.exports = {
    AppError,
    ClientError
};