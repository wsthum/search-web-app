var express = require("express");
var router = express.Router();
var dataQueryCtrl = require("../controllers/documentQuery");

// Contains API route names for query file request
router.post("/query/type/:type", dataQueryCtrl.queryFile);

module.exports = router;