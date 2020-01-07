var express = require("express");
var router = express.Router();
var getKeysCtrl = require("../controllers/getKeys");

// Contains API route names for query file request
router.get("/keys", getKeysCtrl.getKeys);

module.exports = router;