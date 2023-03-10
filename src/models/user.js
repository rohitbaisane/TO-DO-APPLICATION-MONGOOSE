const validator = require("validator");

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "Anonyms",
    },
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

/*userSchema.pre("findOneAndUpdate", function (next) {
const user = this;
console.log(this.isModified);
if (!this.isModified("password")) {
    return next();
}
const hashedPassword = bcrypt.hashSync(user.password, 8);
user.password = hashedPassword;
next();})*/

userSchema.pre("save", function (next) {
    const user = this;
    if (!this.isModified("password")) {
        return next();
    }
    const hashedPassword = bcrypt.hashSync(user.password, 8);
    user.password = hashedPassword;
    next();
});
const UserModel = mongoose.model("User", userSchema, "users");

module.exports = UserModel;