const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");

const setupAndStartServer = async () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/bookingservice/api", apiRoutes);

    app.listen(PORT, async () => {
        console.log(`server started at port ${PORT}`);
    });
}

setupAndStartServer();