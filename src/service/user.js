const User = require("../models/user");

const jwt = require("jsonwebtoken");

const { ClientErrorCodes } = require("../utils/status-codes");
const { JWT_SECREATE_KEY } = require("../config/config");

const bcrypt = require("bcryptjs");


const signIn = async (data) => {

    const { email, password } = data;

    //Check whether user exist for given email id or not.
    const userRecord = await getUserByEmail(email);
    if (!userRecord) {
        throw {
            message: "Email id is wrong",
            statusCode: ClientErrorCodes.BAD_REQUESET,
        };
    }
    else if (!bcrypt.compareSync(password, userRecord.password)) {
        throw {
            message: "Password is wrong",
            statusCode: ClientErrorCodes.BAD_REQUESET,
        };
    }

    //create jwt token 
    const token = createJwtToken(userRecord);
    return token;
}

// GET USER BY ID -,  /user/:id 
const getUser = async (userId) => {
    const userRecord = await User.findById(userId);
    return userRecord;
}

const createUser = async (data) => {
    const userRecord = await User.create(data);
    return userRecord;
}

// UPDATE USER BY ID -> /user/:id
const updateUser = async (userId, data) => {
    const userRecord = await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true });
    return userRecord;
}

// DELETE USER BY ID -> /user/:id
const deleteUser = async (userId) => {
    const userRecord = await User.findByIdAndRemove(userId);
    return userRecord;
}

async function getUserByEmail(email) {
    const userRecord = await User.findOne({ email });
    return userRecord;
}
function createJwtToken(user) {
    const token = jwt.sign({ id: user._id }, JWT_SECREATE_KEY, { expiresIn: "8h" });
    return token;
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    signIn
};