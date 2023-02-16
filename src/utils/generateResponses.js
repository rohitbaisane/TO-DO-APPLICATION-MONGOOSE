function createSuccessResponse(data, message) {
    return {
        success: true,
        message,
        data,
        error: {},
    }
}

function createErrorResponse(error) {
    return {
        success: false,
        message: "Operation failed",
        data: {},
        error,
    }
}

function generateStatusCode(error) {
    if (error.statusCode) {
        return error.statusCode;
    }
    else if (error.name == "Validationerror") {
        return 400;
    }
    else {
        return 500;
    }
}
module.exports = {
    createSuccessResponse,
    createErrorResponse,
    generateStatusCode,
}