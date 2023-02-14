const User = require("../models/user");

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

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
};