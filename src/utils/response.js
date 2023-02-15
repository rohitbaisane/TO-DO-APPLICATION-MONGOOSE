
const SuccessResponseBody = {
    data: null,
    message: null,
    error: {},
    success: true,
};

const ErrorResponseBody = {
    data: {},
    message: null,
    error: null,
    success: false,
};

module.exports = {
    SuccessResponseBody,
    ErrorResponseBody,
}