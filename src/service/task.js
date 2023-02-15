const Task = require("../models/task");
const User = require("../models/user");

const { ServerErrorCodes, ClientErrorCodes, SuccessCodes } = require("../utils/status-codes");

const getTask = async (taskId, user) => {
    const task = await Task.findOne({ _id: taskId, userId: user._id });
    if (!task) {
        throw {
            message: "No task exist for corrosponding user",
            statusCode: ClientErrorCodes.BAD_REQUESET,
        };
    }
    return task;
}

const createTask = async (data) => {
    const task = await Task.create(data);
    return task;
}

const updateTask = async (taskId, data, userId) => {
    const task = await Task.findOneAndUpdate({ _id: taskId, userId }, data, { new: true, runValidators: true });
    if (!task) {
        throw {
            message: "No task exist for corrosponding user",
            statusCode: ClientErrorCodes.BAD_REQUESET
        };
    }
    return task;

}
const deleteTask = async (taskId, userId) => {
    const task = await Task.findOneAndRemove({ _id: taskId, userId });
    if (!task) {
        throw {
            message: "No task exist for corrosponding user",
            statusCode: ClientErrorCodes.BAD_REQUESET
        };
    }
    return task;
}

module.exports = {
    getTask,
    createTask,
    updateTask,
    deleteTask,
}; 