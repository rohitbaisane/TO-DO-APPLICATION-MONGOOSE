const Task = require("../models/task");
const User = require("../modles/User");

const { ServerErrorCodes, ClientErrorCodes, SuccessCodes } = require("../utils/status-codes");
const { AppError, ClientError } = require("../utils/Error");

const getTask = async (taskId) => {
    try {
        const task = await Task.findById(taskId);
        return task;
    }
    catch (err) {
        throw new AppError("Error in service layer", err.message);
    }
}

const createTask = async (data) => {
    try {
        const task = await Task.create(data);
        return task;
    }
    catch (err) {
        if (err.name == "ValidationError") {
            throw new ClientError("Cannot create user", err.message, ClientErrorCodes.BAD_REQUESET);
        }
        throw new AppError("Error in service layer", err.message);
    }

}

const updateTask = async (taskId, data) => {
    try {
        const task = await Task.findByIdAndUpdate(taskId, data, { new: true, runValidators: true });
        return task;
    }
    catch (err) {
        if (err.name == "ValidationError") {
            throw new ClientError("Cannot create user", err.message, ClientErrorCodes.BAD_REQUESET);
        }
        throw new AppError("Error in service layer", err.message);
    }
}
const deleteTask = async (taskId) => {
    try {
        const task = await Task.findByIdAndRemove(taskId);
        return task;
    }
    catch (err) {
        throw new AppError("Error in service layer", err.message);
    }
}



module.exports = {
    getTask,
    createTask,
    updateTask,
    deleteTask,
};