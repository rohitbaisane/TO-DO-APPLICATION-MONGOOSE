const asyncHandler = require("../utils/asyncHandler");
const { TaskService } = require("../service/index");

const checkMandatoryFields = require("./common");

const { createSuccessResponse } = require("../utils/generateResponses");


const getAllTasks = asyncHandler(async (req, res) => {
    const data = { userId: req.user._id };
    const taskRecords = await TaskService.getAllTasks(data.userId);
    const responseBody = createSuccessResponse(taskRecords, "Successfully fetched all tasks");
    return res.OK(responseBody);

});
const getTask = asyncHandler(async (req, res) => {
    const data = { ...req.params, userId: req.user._id };
    const taskRecord = await TaskService.getTask(data.id, data.userId);
    const responseBody = createSuccessResponse(taskRecord, "Succesfully fetched task");
    return res.OK(responseBody);
});

const createTask = asyncHandler(async (req, res) => {
    const data = { ...req.body, userId: req.user._id };
    checkMandatoryFields(data, ['description']);
    const taskRecord = await TaskService.createTask({
        description: data.description,
        userId: data.userId,
    });
    const responseBody = createSuccessResponse(taskRecord, "Successfully created a task");
    return res.CREATED(responseBody);
});

const updateTask = asyncHandler(async (req, res) => {
    const data = { ...req.params, userId: req.user._id, body: req.body };
    const taskRecord = await TaskService.updateTask(data.id, data.body, data.userId);
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
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
}