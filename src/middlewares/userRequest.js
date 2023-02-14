const jwt = require("jsonwebtoken");
const { userService } = require("../service/index");

const { ServerErrorCodes, ClientErrorCodes } = require("../utils/status-codes");
const { AppError, ClientError } = require("../utils/Error");
const { ErrorResponseBody } = require("../utils/responsebody");
const isValidUser = async (req, res, next) => {

    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            throw ClientError("Cannot validate User", "Token is missing", ClientErrorCodes.BAD_REQUESET);
        }
        const object = jwt.verify(token);
        const user = await userService.getUser(object.id);
        if (!user) {
            throw ClientError("Cannot validate User", "No user exist for corrosponding token", ClientErrorCodes.BAD_REQUESET);
        }
        req.user = user;
        next();
    }
    catch (err) {
        ErrorResponseBody.err = err.explanation;
        ErrorResponseBody.message = err.message;
        return res.status(err.statusCode).json(ErrorResponseBody);
    }
};

module.exports = isValidUser;

