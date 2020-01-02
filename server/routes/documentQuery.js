var express = require("express");
var router = express.Router();
var dataQueryCtrl = require("../controllers/documentQuery");

router.get("/query/type/:type", dataQueryCtrl.queryFile);

module.exports = router;