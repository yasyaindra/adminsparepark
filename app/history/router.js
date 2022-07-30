var express = require("express");
var router = express.Router();
const { index, actionDrop } = require("./controller");

router.get("/", index);
router.get("/drop", actionDrop);

module.exports = router;
