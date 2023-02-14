const User = require("../models/user");

const jwt = require("jsonwebtoken");

const { ServerErrorCodes, ClientErrorCodes, SuccessCodes } = require("../utils/status-codes");
const { AppError, ClientError } = require("../utils/Error");

const signIn = async (data) => {

    try {
        const { email, password } = data;
        //Check whether user exist for given email id or not.
        const user = getUserByEmail(email);
        if (!user)
            throw new ClientError("No user exist for corrosponding email", ClientErrorCodes.BAD_REQUESET);
        //create jwt token 
        const token = createJwtToken(user);
        return token;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}


const getUser = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    }
    catch (err) {
        throw new AppError("Error in Service layer", "Cannot fetch user", err.message, ServerErrorCodes.INTERNAL_SERVER_ERROR);
    }
}

const createUser = async (data) => {
    try {
        const user = await User.create(data);
        return user;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

const updateUser = async (userId, data) => {
    try {
        const user = await User.findByIdAndUpdate(userId, data, { new: true });
        return user;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}
const deleteUser = async (userId) => {

    try {
        const user = await User.findByIdAndRemove(userId);
        return user;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

async function getUserByEmail(email) {
    try {
        const user = await User.findOne({ email });
        return user;
    }
    catch (err) {
        throw err;
    }
}
function createJwtToken(user) {
    try {
        const token = jwt.sign({ id: user._id }, "This is my secreate key");
        return token;
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    signIn
};