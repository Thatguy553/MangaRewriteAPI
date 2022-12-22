require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./config/database");

const app = express();
const port = process.env.APP_PORT || 5000;

// Config Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use((req, res, next) => {
    console.log('Time: ', Date.now())
    req.pool = pool;
    next()
})

// Routing Middleware
app.use("/account", require("./api/accountRouter"));
app.use("/series", require("./api/seriesRouter"));
app.use("/chapter", require("./api/chapterRouter"));

app.listen(port, () => console.log(`Listening on port ${port}`));

