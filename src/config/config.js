const dotenv = require("dotenv");
dotenv.config();

const { PORT, MONGO_URL, JWT_SECREATE_KEY } = process.env;

module.exports = {
    PORT,
    MONGO_URL,
    JWT_SECREATE_KEY,
};