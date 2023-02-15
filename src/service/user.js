const User = require("../models/user");

const jwt = require("jsonwebtoken");

const { ClientErrorCodes } = require("../utils/status-codes");


const signIn = async (data) => {

    const { email, password } = data;

    //Check whether user exist for given email id or not.
    const user = await getUserByEmail(email);
    if (!user) {
        throw {
            message: "Email id is wrong",
            statusCode: ClientErrorCodes.BAD_REQUESET,
        };
    }
    else if (user.password != password) {
        throw {
            message: "Password is wrong",
            statusCode: ClientErrorCodes.BAD_REQUESET,
        };
    }

    //create jwt token 
    const token = createJwtToken(user);
    return token;
}

// GET USER BY ID -,  /user/:id 
const getUser = async (userId) => {
    const user = await User.findById(userId);
    return user;
}

const createUser = async (data) => {
    const user = await User.create(data);
    return user;
}

// UPDATE USER BY ID -> /user/:id
const updateUser = async (userId, data) => {
    const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true });
    return updatedUser;
}

// DELETE USER BY ID -> /user/:id
const deleteUser = async (userId) => {
    const deletedUser = await User.findByIdAndRemove(userId);
    return deletedUser;
}

async function getUserByEmail(email) {
    const user = await User.findOne({ email });
    return user;
}
function createJwtToken(user) {
    const token = jwt.sign({ id: user._id }, "This is my secreate key", { expiresIn: "8h" });
    return token;
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    signIn
};