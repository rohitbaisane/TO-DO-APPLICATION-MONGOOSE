const { taskService } = require("../service/index");

const { SuccessResponseBody, ErrorResponseBody } = require("../utils/responsebody");
const { ServerErrorCodes, SuccessCodes } = require("../utils/status-codes");


const getTask = async (req, res) => {
    try {
        const task = await taskService.getTask(req.params.id);
        SuccessResponseBody.data = task;
        SuccessResponseBody.message = "Successfully fetched a task";
        return res.status(SuccessCodes.OK).json(SuccessResponseBody);
    }
    catch (err) {
        ErrorResponseBody.message = err.message;
        ErrorResponseBody.err = err.explanation;
        return res.status(err.statusCode).json(ErrorResponseBody);
    }
}

const createTask = async (req, res) => {
    try {
        const { description } = req.body;
        const task = await taskService.createTask({
            description,
        });
        SuccessResponseBody.data = task;
        SuccessResponseBody.message = "Successfully created a task";
        return res.status(SuccessCodes.CREATED).json(SuccessResponseBody);
    }
    catch (err) {
        ErrorResponseBody.message = err.message;
        ErrorResponseBody.err = err.explanation;
        return res.status(err.statusCode).json(ErrorResponseBody);
    }
}

const updateTask = async (req, res) => {
    try {
        const task = await taskService.updateTask(req.params.id, req.body);
        SuccessResponseBody.data = task;
        SuccessResponseBody.message = "Successfully updated a task";
        return res.status(SuccessCodes.OK).json(SuccessResponseBody);
    }
    catch (err) {
        ErrorResponseBody.message = err.message;
        ErrorResponseBody.err = err.explanation;
        return res.status(err.statusCode).json(ErrorResponseBody);
    }
}


const deleteTask = async (req, res) => {
    try {
        const task = await taskService.deleteTask(req.params.id);
        SuccessResponseBody.data = task;
        SuccessResponseBody.message = "Successfully deleted a task";
        return res.status(SuccessCodes.OK).json(SuccessResponseBody);
    }
    catch (err) {
        ErrorResponseBody.message = err.message;
        ErrorResponseBody.err = err.explanation;
        return res.status(err.statusCode).json(ErrorResponseBody);
    }
}

module.exports = {
    getTask,
    createTask,
    updateTask,
    deleteTask,
}