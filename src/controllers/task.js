const { taskService } = require("../service/index");

const { SuccessResponseBody, ErrorResponseBody } = require("../utils/response");
const { ServerErrorCodes, ClientErrorCodes, SuccessCodes } = require("../utils/status-codes");


const getTask = async (req, res) => {
    try {
        const task = await taskService.getTask(req.params.id, req.user);
        SuccessResponseBody.data = task;
        SuccessResponseBody.message = "Successfully fetched a task";
        return res.status(SuccessCodes.OK).json(SuccessResponseBody);
    }
    catch (err) {
        ErrorResponseBody.message = "Cannot fetch task";
        ErrorResponseBody.error = err.message;
        let statusCode = err.statusCode || ServerErrorCodes.INTERNAL_SERVER_ERROR;
        if (err.name = "Validationerror")
            statusCode = ClientErrorCodes.BAD_REQUESET;
        return res.status(statusCode).json(ErrorResponseBody);
    }
}

const createTask = async (req, res) => {
    try {
        const { description } = req.body;
        const task = await taskService.createTask({
            description, userId: req.user._id
        },);
        SuccessResponseBody.data = task;
        SuccessResponseBody.message = "Successfully created a task";
        return res.status(SuccessCodes.CREATED).json(SuccessResponseBody);
    }
    catch (err) {
        ErrorResponseBody.message = "Cannot create task";
        ErrorResponseBody.error = err.message;
        let statusCode = err.statusCode || ServerErrorCodes.INTERNAL_SERVER_ERROR;
        if (err.name = "Validationerror")
            statusCode = ClientErrorCodes.BAD_REQUESET;
        return res.status(statusCode).json(ErrorResponseBody);
    }
}

const updateTask = async (req, res) => {
    try {
        const task = await taskService.updateTask(req.params.id, req.body, req.user._id);
        SuccessResponseBody.data = task;
        SuccessResponseBody.message = "Successfully updated a task";
        return res.status(SuccessCodes.OK).json(SuccessResponseBody);
    }
    catch (err) {
        ErrorResponseBody.message = "Cannot update task";
        ErrorResponseBody.error = err.message;
        let statusCode = err.statusCode || ServerErrorCodes.INTERNAL_SERVER_ERROR;
        if (err.name = "Validationerror")
            statusCode = ClientErrorCodes.BAD_REQUESET;
        return res.status(statusCode).json(ErrorResponseBody);
    }
}


const deleteTask = async (req, res) => {
    try {
        const task = await taskService.deleteTask(req.params.id, req.user._id);
        SuccessResponseBody.data = task;
        SuccessResponseBody.message = "Successfully deleted a task";
        return res.status(SuccessCodes.OK).json(SuccessResponseBody);
    }
    catch (err) {
        ErrorResponseBody.message = "Cannot delete task";
        ErrorResponseBody.error = err.message;
        let statusCode = err.statusCode || ServerErrorCodes.INTERNAL_SERVER_ERROR;
        if (err.name = "Validationerror")
            statusCode = ClientErrorCodes.BAD_REQUESET;
        return res.status(statusCode).json(ErrorResponseBody);
    }
}

module.exports = {
    getTask,
    createTask,
    updateTask,
    deleteTask,
}