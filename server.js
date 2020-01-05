const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const config = require("./config/config");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

app.use(config.apiPath, require(config.documentQueryApiPath));

app.use(function(err, req, res, next) {
    return res.status(500).json({ success: false, error: err.message });
});

app.listen(config.serverPort, function(){
    console.log("Backend server running on localhost:3002");
})

module.exports = app;