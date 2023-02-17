const User = require("../models/user");
const Token = require("../models/token");


const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const { sendMail } = require("./sendMail");

const { ClientErrorCodes } = require("../utils/status-codes");
const { JWT_SECREATE_KEY } = require("../config/config");

const bcrypt = require("bcryptjs");
const ErrorResponse = require("../utils/error");


const signIn = async (data) => {

    const { email, password } = data;
    //Check whether user exist for given email id or not.
    const userRecord = await getUserByEmail(email);

    if (!bcrypt.compareSync(password, userRecord.password)) {
        throw new ErrorResponse(
            "Password is wrong",
            ClientErrorCodes.BAD_REQUESET,
        );
    }

    //create jwt token 
    const token = createJwtToken(userRecord);
    return token;
}

// GET USER BY ID -,  /user/:id 
const getUser = async (userId) => {
    console.log(userId);
    console.log(typeof userId);
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

const resetPasswordRequest = async (email) => {
    const userRecord = await getUserByEmail(email);
    const userId = userRecord._id;
    const tokenRecord = await Token.findOne({ userId });

    if (tokenRecord)
        await tokenRecord.deleteOne();

    const resetToken = crypto.randomBytes(32).toString("hex");

    await Token.create({
        token: resetToken,
        userId
    });

    const resetLink = `http://localhost:3000/changepassword?token=${resetToken}&userId=${userId}`;

    sendMail(resetLink, email).then((response) => {
        console.log("Email is sent successfully");
    });
    return true;
}

const changePassword = async (token, userId, newPassword) => {
    const tokenRecord = await Token.findOne({ token });
    if (!tokenRecord)
        throw new ErrorResponse(
            "Invalid reset token",
            ClientErrorCodes.BAD_REQUESET);

    const userRecord = await User.findByIdAndUpdate(userId, { password: newPassword }, { new: true, runValidators: true });
    return userRecord;

}
async function getUserByEmail(email) {

    const userRecord = await User.findOne({ email });
    if (!userRecord) {
        throw new ErrorResponse(
            "Email id is wrong",
            ClientErrorCodes.BAD_REQUESET,
        );
    }
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
    signIn,
    getUserByEmail,
    resetPasswordRequest,
    changePassword
};