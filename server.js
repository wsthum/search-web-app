const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const config = require("./config/config")
var path = require("path")

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
// app.use(express.static(__dirname + '/dist/dunst'));

// app.get('/*', function(req,res) {
//     res.sendFile(path.join(__dirname + '/dist/dunst/index.html'));
// });

app.use(function(err, req, res, next) {
    return res.status(500).json({ success: false, error: err.message });
});

app.listen(3002, function(){
    console.log("Backend server running on localhost:3002")
})