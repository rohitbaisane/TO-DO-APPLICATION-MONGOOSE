const express = require("express");
const app = express();

// prepare and start the starver.

const prepareAndStartServer = async (req, res) => {

    //parser the incoming json and url-encoded data.
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());


    app.listen(3000, () => {
        console.log("Server is listening");
    })

};

prepareAndStartServer();