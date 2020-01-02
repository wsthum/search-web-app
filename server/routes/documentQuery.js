var express = require("express");
var router = express.Router();
var dataQueryCtrl = require("../controllers/documentQuery");

router.get("/query/dataType/:type/queryData/:data", dataQueryCtrl.queryFile);

module.exports = router;