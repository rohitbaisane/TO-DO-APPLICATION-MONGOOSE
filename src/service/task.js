const Task = require("../models/task");

const { ServerErrorCodes, ClientErrorCodes, SuccessCodes } = require("../utils/status-codes");
const { AppError, ClientError } = require("../utils/Error");

const getTask = async (taskId) => {
    try {
        const task = await Task.findById(taskId);
        return task;
    }
    catch (err) {
        console.log(err);
        throw new AppError(err.name, err.message);
    }
}

const createTask = async (data) => {
    try {
        const task = await Task.create(data);
        return task;
    }
    catch (err) {
        console.log(err.name);
        console.log(err.message);
        throw new AppError(err.name, err.message);
    }

}

const updateTask = async (taskId, data) => {
    try {
        const task = await Task.findByIdAndUpdate(taskId, data, { new: true });
        return task;
    }
    catch (err) {
        console.log(err);
        throw new AppError(err.name, err.message);
    }
}
const deleteTask = async (taskId) => {
    try {
        const task = await Task.findByIdAndRemove(taskId);
        return task;
    }
    catch (err) {
        console.log(err);
        throw new AppError(err.name, err.message);
    }
}



module.exports = {
    getTask,
    createTask,
    updateTask,
    deleteTask,
};