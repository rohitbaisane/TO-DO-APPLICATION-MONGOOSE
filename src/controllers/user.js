const { userService } = require("../service/index");

const { SuccessResponseBody, ErrorResponseBody } = require("../utils/response");
const { ServerErrorCodes, SuccessCodes } = require("../utils/status-codes");


const getUser = async (req, res) => {
    try {
        const user = await userService.getUser(req.user.id);
        SuccessResponseBody.data = user;
        SuccessResponseBody.message = "Successfully fetched a user";
        return res.status(SuccessCodes.OK).json(SuccessResponseBody);
    }
    catch (err) {
        ErrorResponseBody.message = "Cannot fetch user";
        ErrorResponseBody.error = err.message;
        const statusCode = err.statusCode || ServerErrorCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json(ErrorResponseBody);
    }
}

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await userService.signIn({ email, password });
        SuccessResponseBody.data = response;
        SuccessResponseBody.message = "Successfully loggedin";
        return res.status(SuccessCodes.OK).json(SuccessResponseBody);
    }
    catch (err) {
        console.log(err);
        ErrorResponseBody.message = "Cannot signin";
        ErrorResponseBody.error = err.message;
        const statusCode = err.statusCode || ServerErrorCodes.INTERNAL_SERVER_ERROR;;
        return res.status(statusCode).json(ErrorResponseBody);
    }

}
const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await userService.createUser({
            name,
            email,
            password
        });
        SuccessResponseBody.data = user;
        SuccessResponseBody.message = "Successfully created account";
        return res.status(SuccessCodes.CREATED).json(SuccessResponseBody);
    }
    catch (err) {
        ErrorResponseBody.message = "Cannot create user";
        ErrorResponseBody.error = err.message;
        const statusCode = err.statusCode || ServerErrorCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json(ErrorResponseBody);
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.user.id, req.body);
        SuccessResponseBody.data = response;
        SuccessResponseBody.message = "Successfully updated a user";
        return res.status(SuccessCodes.OK).json(SuccessResponseBody);
    }
    catch (err) {
        ErrorResponseBody.message = "Cannot update user";
        ErrorResponseBody.error = err.message;
        const statusCode = err.statusCode || ServerErrorCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json(ErrorResponseBody);
    }
}


const deleteUser = async (req, res) => {
    try {
        const response = await userService.deleteUser(req.user.id);
        SuccessResponseBody.data = response;
        SuccessResponseBody.message = "Successfully deleted a user";
        return res.status(SuccessCodes.OK).json(SuccessResponseBody);
    }
    catch (err) {
        ErrorResponseBody.message = "Cannot delete user";
        ErrorResponseBody.error = err.message;
        const statusCode = err.statusCode || ServerErrorCodes.INTERNAL_SERVER_ERROR;
        return res.status(statusCode).json(ErrorResponseBody);
    }
}

module.exports = {
    getUser,
    signUp,
    updateUser,
    deleteUser,
    signIn
}