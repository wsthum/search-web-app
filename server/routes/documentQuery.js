var express = require("express");
var router = express.Router();
var dataQueryCtrl = require("../controllers/documentQuery");

router.post("/query/type/:type", dataQueryCtrl.queryFile);

module.exports = router;