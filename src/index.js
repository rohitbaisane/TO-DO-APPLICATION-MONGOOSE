const express = require("express");
const app = express();

require("./db");

const { PORT } = require("./config/config");
const errorHandler = require("./middlewares/errorHandler");
const apiRoutes = require("./routes/index");

// prepare and start the starver.

const prepareAndStartServer = async (req, res) => {

    //parser the incoming json and url-encoded data.
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use("/", apiRoutes);
    app.use(errorHandler)

    app.listen(PORT, () => {
        console.log("Server is listening");
    })

};

prepareAndStartServer();