const mongoose = require("mongoose");

const { MONGO_URL } = require("./config/config");

mongoose.set("strictQuery", false);
const connect = async () => {
    await mongoose.connect(MONGO_URL);
    console.log("database is connected");
}
connect();