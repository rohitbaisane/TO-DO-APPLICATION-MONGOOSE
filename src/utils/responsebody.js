const SuccessResponseBody = {
    data: null,
    error: {},
    success: true,
    message: null,
};

const ErrorResponseBody = {
    data: {},
    error: null,
    success: false,
    message: null,
};

module.exports = {
    SuccessResponseBody,
    ErrorResponseBody,
}