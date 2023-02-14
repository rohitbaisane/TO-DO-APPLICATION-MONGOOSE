const Task = require("../models/task");


const getTask = async (taskId) => {
    const task = await Task.findById(taskId);
    return task;
}

const createTask = async (data) => {
    const task = await Task.create(data);
    return task;

}

const updateTask = async (taskId, data) => {
    console.log(data);
    const task = await Task.findByIdAndUpdate(taskId, data, { new: true });
    return task;
}
const deleteTask = async (taskId) => {
    const task = await Task.findByIdAndRemove(taskId);
    return task;
}



module.exports = {
    getTask,
    createTask,
    updateTask,
    deleteTask,
};