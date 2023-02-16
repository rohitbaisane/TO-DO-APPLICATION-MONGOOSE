const { createErrorResponse } = require("../utils/generateResponses");

function errorHandler(err, req, res, next) {
    const responseBody = createErrorResponse(err.message);
    if (err.statusCode == 400) {
        return res.BADREQUEST(responseBody);
    }
    return res.APPERROR(responseBody);

}

module.exports = errorHandler;
