const Task = require("../models/task");
const User = require("../models/user");

const { ClientErrorCodes } = require("../utils/status-codes");
const ErrorResponse = require("../utils/error");

// GET TASK BY ID -> /task/:id
const getTask = async (taskId, userId) => {

    const taskRecord = await Task.findOne({ _id: taskId, userId });

    if (!taskRecord) {
        throw new ErrorResponse(
            "No task exist for corrosponding user",
            ClientErrorCodes.BAD_REQUESET);
    }
    return taskRecord;
}

const createTask = async (data) => {

    const taskRecord = await Task.create(data);
    return taskRecord;
}

// UPDATE TASK BY ID -> PATCH -> /task/:id
const updateTask = async (taskId, data, userId) => {

    const taskRecord = await Task.findOneAndUpdate({ _id: taskId, userId }, data, { new: true, runValidators: true });

    if (!taskRecord) {
        throw new ErrorResponse(
            "No task exist for corrosponding user",
            ClientErrorCodes.BAD_REQUESET
        );
    }
    return taskRecord;

}

// DELETE TASK BY ID -> /task/:id
const deleteTask = async (taskId, userId) => {

    const taskRecord = await Task.findOneAndRemove({ _id: taskId, userId });

    if (!taskRecord) {
        throw new ErrorResponse(
            "No task exist for corrosponding user",
            ClientErrorCodes.BAD_REQUESET
        );
    }
    return taskRecord;
}

module.exports = {
    getTask,
    createTask,
    updateTask,
    deleteTask,
}; 