const { UserService } = require("../service/index");

const { createSuccessResponse } = require("../utils/generateResponses");
const { ServerErrorCodes, ClientErrorCodes, SuccessCodes } = require("../utils/status-codes");

const asyncHandler = require("../utils/asyncHandler");

const getUser = asyncHandler(async (req, res) => {
    const userRecord = await UserService.getUser(req.user.id);
    const responseBody = createSuccessResponse(userRecord, "Successfully fetched a user");
    return res.OK(responseBody);
});

const signIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const response = await UserService.signIn({ email, password });
    const responseBody = createSuccessResponse(response, "Successfully loggedin");
    return res.OK(responseBody);
});

const signUp = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userRecord = await UserService.createUser({
        name,
        email,
        password
    });
    const responseBody = createSuccessResponse(userRecord, "Successfully created account");
    return res.OK(responseBody);
});

const updateUser = asyncHandler(async (req, res) => {
    const userRecord = await UserService.updateUser(req.user.id, req.body);
    const responseBody = createSuccessResponse(userRecord, "Successfully updated a user");
    return res.OK(responseBody);
});

const deleteUser = asyncHandler(async (req, res) => {
    const userRecord = await UserService.deleteUser(req.user.id);
    const responseBody = createSuccessResponse(userRecord, "Successfully deleted a user");
    return res.OK(responseBody);
});

const resetPasswordRequest = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const response = await UserService.resetPasswordRequest(email);
    const responseBody = createSuccessResponse(response, "Reset link is sent to your email address");
    return res.OK(responseBody);
});

const changePassword = asyncHandler(async (req, res) => {
    const data = { ...req.query, ...req.body };
    const response = await UserService.changePassword(data.token, data.userId, data.password);
    const responseBody = createSuccessResponse(response, "Successfully changed a password");
    return res.OK(responseBody);
});


module.exports = {
    getUser,
    signUp,
    updateUser,
    deleteUser,
    signIn,
    resetPasswordRequest,
    changePassword,
}