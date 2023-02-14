const { taskService } = require("../service/index");


const getTask = async (req, res) => {

    const task = await taskService.getTask(req.params.id);
    return res.json({
        data: task,
        success: true,
    })
}

const createTask = async (req, res) => {
    const { description } = req.body;
    const task = await taskService.createTask({
        description
    });
    return res.json({
        data: task,
        success: true,
    })
}

const updateTask = async (req, res) => {
    const task = await taskService.updateTask(req.params.id, req.body);
    return res.json({
        data: task,
        success: true,
    });
}


const deleteTask = async (req, res) => {
    const task = await taskService.deleteTask(req.params.id);
    return res.json({
        data: task,
        success: true,
    });
}

module.exports = {
    getTask,
    createTask,
    updateTask,
    deleteTask,
}