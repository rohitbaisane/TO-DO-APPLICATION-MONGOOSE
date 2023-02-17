const { UserService } = require("../service/index");

const { createSuccessResponse } = require("../utils/generateResponses");

const checkMandatoryFields = require("./common");

const asyncHandler = require("../utils/asyncHandler");

const getUser = asyncHandler(async (req, res) => {
    const data = req.user;
    const userRecord = await UserService.getUser(data._id);
    const responseBody = createSuccessResponse(userRecord, "Successfully fetched a user");
    return res.OK(responseBody);
});

const signIn = asyncHandler(async (req, res) => {
    const data = { ...req.body };
    checkMandatoryFields(data, ['email', 'password']);
    const response = await UserService.signIn(data);
    const responseBody = createSuccessResponse(response, "Successfully loggedin");
    return res.OK(responseBody);
});

const signUp = asyncHandler(async (req, res) => {
    const data = { ...req.body };
    checkMandatoryFields(data, ['email', 'password']);
    const userRecord = await UserService.createUser({
        name: data.name,
        email: data.email,
        password: data.password
    });
    const responseBody = createSuccessResponse(userRecord, "Successfully created account");
    return res.OK(responseBody);
});

const updateUser = asyncHandler(async (req, res) => {
    const data = { body: req.body, userId: req.user._id };
    const userRecord = await UserService.updateUser(data.userId, data.body);
    const responseBody = createSuccessResponse(userRecord, "Successfully updated a user");
    return res.OK(responseBody);
});

const deleteUser = asyncHandler(async (req, res) => {
    const data = req.user;
    const userRecord = await UserService.deleteUser(data._id);
    const responseBody = createSuccessResponse(userRecord, "Successfully deleted a user");
    return res.OK(responseBody);
});

const resetPasswordRequest = asyncHandler(async (req, res) => {
    const data = { ...req.body };
    checkMandatoryFields(data, ['email']);
    const response = await UserService.resetPasswordRequest(data.email);
    const responseBody = createSuccessResponse(response, "Reset link is sent to your email address");
    return res.OK(responseBody);
});

const changePassword = asyncHandler(async (req, res) => {
    const data = { ...req.query, ...req.body };
    checkMandatoryFields(data, ['token', 'userId', 'password']);
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