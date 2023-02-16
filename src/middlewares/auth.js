const jwt = require("jsonwebtoken");
const { UserService } = require("../service/index");

const { ServerErrorCodes, ClientErrorCodes } = require("../utils/status-codes");
const { ErrorResponseBody } = require("../utils/generateResponses");

const { JWT_SECREATE_KEY } = require("../config/config");

const asyncHandler = require("./asyncHandler");
const isValidUser = asyncHandler(async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        throw {
            message: "Token is missing",
            statusCode: ClientErrorCodes.BAD_REQUESET
        };
    }
    const object = jwt.verify(token, JWT_SECREATE_KEY);
    const userRecord = await UserService.getUser(object.id);
    if (!userRecord) {
        throw {
            message: "No user exist for corrosponding token",
            statusCode: ClientErrorCodes.BAD_REQUESET
        };
    }
    req.user = userRecord;
    next();
});

module.exports = isValidUser;

