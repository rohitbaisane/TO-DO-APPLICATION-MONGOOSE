const jwt = require("jsonwebtoken");
const { userService } = require("../service/index");

const { ServerErrorCodes, ClientErrorCodes } = require("../utils/status-codes");
const { ErrorResponseBody } = require("../utils/response");
const isValidUser = async (req, res, next) => {

    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            throw {
                message: "Token is missing",
                statusCode: ClientErrorCodes.BAD_REQUESET
            };
        }
        const object = jwt.verify(token, "This is my secreate key");
        const user = await userService.getUser(object.id);
        if (!user) {
            throw {
                message: "No user exist for corrosponding token",
                statusCode: ClientErrorCodes.BAD_REQUESET
            };
        }
        req.user = user;
        next();
    }
    catch (err) {
        ErrorResponseBody.err = err.explanation;
        ErrorResponseBody.message = err.message;
        const statusCode = err.statusCode || ServerErrorCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json(ErrorResponseBody);
    }
};

module.exports = isValidUser;

