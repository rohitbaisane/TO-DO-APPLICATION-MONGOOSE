const validator = require("validator");

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100,
    },

}, {
    timestamps: true
});

userSchema.pre("save", function (next) {
    const user = this;
    const hashedPassword = bcrypt.hashSync(user.password, 8);
    user.password = hashedPassword;
    next();
});
const UserModel = mongoose.model("User", userSchema, "users");

module.exports = UserModel;