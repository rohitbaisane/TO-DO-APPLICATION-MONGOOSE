const User = require("../models/user");

const jwt = require("jsonwebtoken");

const { ServerErrorCodes, ClientErrorCodes } = require("../utils/status-codes");
const { AppError, ClientError } = require("../utils/Error");

const signIn = async (data) => {

    try {
        const { email, password } = data;
        //Check whether user exist for given email id or not.
        const user = getUserByEmail(email);
        if (!user)
            throw new ClientError("Cannot signin", "Email is incorrect", ClientErrorCodes.BAD_REQUESET);

        if (user.password != password)
            throw new ClientError("Cannot signin", "Password is incorrect", ClientErrorCodes.BAD_REQUESET);
        //create jwt token 
        const token = createJwtToken(user);
        return token;
    }
    catch (err) {
        throw new AppError("Error in service layer", err.message);
    }
}


const getUser = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    }
    catch (err) {
        throw new AppError("Error in service layer", err.message);
    }
}

const createUser = async (data) => {
    try {
        const user = await User.create(data);
        return user;
    }
    catch (err) {
        if (err.name == "ValidationError") {
            throw new ClientError("Cannot create user", err.message, ClientErrorCodes.BAD_REQUESET);
        }
        throw new AppError("Error in service layer", err.message);
    }
}

const updateUser = async (userId, data) => {
    try {
        const user = await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true });
        return user;
    }
    catch (err) {
        if (err.name == "ValidationError") {
            throw new ClientError("Cannot create user", err.message, ClientErrorCodes.BAD_REQUESET);
        }
        throw new AppError("Error in service layer", err.message);
    }
}
const deleteUser = async (userId) => {

    try {
        const user = await User.findByIdAndRemove(userId);
        return user;
    }
    catch (err) {
        throw new AppError("Error in service layer", err.message);
    }
}

async function getUserByEmail(email) {
    try {
        const user = await User.findOne({ email });
        return user;
    }
    catch (err) {
        throw new AppError("Error in service layer", err.message);
    }
}
function createJwtToken(user) {
    try {
        const token = jwt.sign({ id: user._id }, "This is my secreate key", { expiresIn: "8h" });
        return token;
    }
    catch (err) {
        throw new AppError("Error in service layer", err.message);
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    signIn
};