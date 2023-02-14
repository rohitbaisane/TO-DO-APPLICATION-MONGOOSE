const User = require("../models/user");

const jwt = require("jsonwebtoken");


const signIn = async (data) => {

    const { email, password } = data;

    //Check whether user exist for given email id or not.
    const user = getUserByEmail(email);
    //create jwt token 
    const token = createJwtToken(user);
    return token;
}


const getUser = async (userId) => {

    const user = await User.findById(userId);
    return user;
}

const createUser = async (data) => {
    const user = await User.create(data);
    return user;

}

const updateUser = async (userId, data) => {
    console.log(data);
    const user = await User.findByIdAndUpdate(userId, data, { new: true });
    console.log(user);
    return user;
}
const deleteUser = async (userId) => {
    const user = await User.findByIdAndRemove(userId);
    return user;
}

async function getUserByEmail(email) {
    const user = await User.findOne({ email });
    return user;
}
function createJwtToken(user) {
    const token = jwt.sign({ id: user._id }, "This is my secreate key");
    return token;
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    signIn
};