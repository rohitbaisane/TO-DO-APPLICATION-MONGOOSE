const ClientErrorCodes = Object.freeze({
    BAD_REQUESET: 400,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
});


const ServerErrorCodes = Object.freeze({
    INTERNAL_SERVER_ERROR: 500,
});

const SuccessCodes = Object.freeze({
    OK: 200,
    CREATED: 201,
});

module.exports = {
    ClientErrorCodes,
    ServerErrorCodes,
    SuccessCodes,
};