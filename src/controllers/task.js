const asyncHandler = require("../middlewares/asyncHandler");
const { TaskService } = require("../service/index");

const { createSuccessResponse } = require("../utils/generateResponses");
const { SuccessCodes } = require("../utils/status-codes");


const getTask = asyncHandler(async (req, res) => {
    const data = { ...req.params, userId: req.user._id };
    const taskRecord = await TaskService.getTask(data.id, data.userId);
    const responseBody = createSuccessResponse(taskRecord, "Succesfully fetched task");
    return res.OK(responseBody);
});

const createTask = asyncHandler(async (req, res) => {
    const data = { ...req.body, userId: req.user._id };
    const taskRecord = await TaskService.createTask({
        description: data.description,
        userId: data.userId,
    });
    const responseBody = createSuccessResponse(taskRecord, "Successfully created a task");
    return res.CREATED(responseBody);
});

const updateTask = asyncHandler(async (req, res) => {
    const data = { ...req.params, userId: req.user._id };
    const taskRecord = await TaskService.updateTask(data.id, req.body, data.userId);
    const responseBody = createSuccessResponse(taskRecord, "Successfully updated a task");
    return res.OK(responseBody);
});


const deleteTask = asyncHandler(async (req, res) => {
    const data = { ...req.params, userId: req.user._id };
    const taskRecord = await TaskService.deleteTask(data.id, data.userId);
    const responseBody = createSuccessResponse(taskRecord, "Successfully deleted a task");
    return res.OK(responseBody);
});

module.exports = {
    getTask,
    createTask,
    updateTask,
    deleteTask,
}