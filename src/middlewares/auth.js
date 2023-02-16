const jwt = require("jsonwebtoken");
const { UserService } = require("../service/index");

const { JWT_SECREATE_KEY } = require("../config/config");

const ErrorResponse = require("../utils/error");
const asyncHandler = require("../utils/asyncHandler");

const isValidUser = asyncHandler(async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        throw new ErrorResponse(
            "Token is missing",
            ClientErrorCodes.BAD_REQUESET
        );
    }
    const object = jwt.verify(token, JWT_SECREATE_KEY);
    const userRecord = await UserService.getUser(object.id);
    if (!userRecord) {
        throw new ErrorResponse(
            "No user exist for corrosponding token",
            ClientErrorCodes.BAD_REQUESET
        );
    }
    req.user = userRecord;
    next();
});

module.exports = isValidUser;

