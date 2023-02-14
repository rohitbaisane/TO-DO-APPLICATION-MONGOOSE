const validator = require("validator");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 100,
    },
    tasks: [mongoose.Schema.Types.ObjectId],

}, {
    timestamps: true
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;