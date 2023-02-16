const { UserService } = require("../service/index");

const { createSuccessResponse } = require("../utils/generateResponses");
const { ServerErrorCodes, ClientErrorCodes, SuccessCodes } = require("../utils/status-codes");

const asyncHandler = require("../utils/asyncHandler");

const getUser = asyncHandler(async (req, res) => {
    const userRecord = await UserService.getUser(req.user.id);
    const successResponseBody = createSuccessResponse(userRecord, "Successfully fetched a user");
    return res.status(SuccessCodes.OK).json(successResponseBody);
});

const signIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const response = await UserService.signIn({ email, password });
    const successResponseBody = createSuccessResponse(response, "Successfully loggedin");
    return res.status(SuccessCodes.OK).json(successResponseBody);
});

const signUp = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userRecord = await UserService.createUser({
        name,
        email,
        password
    });
    const successResponseBody = createSuccessResponse(userRecord, "Successfully created account");
    return res.status(SuccessCodes.CREATED).json(successResponseBody);
});

const updateUser = asyncHandler(async (req, res) => {
    const userRecord = await UserService.updateUser(req.user.id, req.body);
    const successResponseBody = createSuccessResponse(userRecord, "Successfully updated a user");
    return res.status(SuccessCodes.OK).json(successResponseBody);
});


const deleteUser = asyncHandler(async (req, res) => {
    const userRecord = await UserService.deleteUser(req.user.id);
    const successResponseBody = createSuccessResponse(userRecord, "Successfully deleted a user");
    return res.status(SuccessCodes.OK).json(successResponseBody);
});

module.exports = {
    getUser,
    signUp,
    updateUser,
    deleteUser,
    signIn
}