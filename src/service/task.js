const Task = require("../models/task");
const User = require("../models/user");

const { ClientErrorCodes } = require("../utils/status-codes");

// GET TASK BY ID -> /task/:id
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

// UPDATE TASK BY ID -> PATCH -> /task/:id
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

// DELETE TASK BY ID -> /task/:id
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