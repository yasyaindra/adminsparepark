var express = require("express");
var router = express.Router();
const {
  index,
  viewCreate,
  actionCreate,
  viewDetail,
  viewEdit,
  actionEdit,
  actionDelete,
} = require("./controller");
const multer = require("multer");
const os = require("os");

router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", actionCreate);
router.get("/detail/:id", viewDetail);
router.get("/edit/:id", viewEdit);
router.put(
  "/edit/:id",
  multer({ dest: os.tmpdir() }).single("image"),
  actionEdit
);
router.delete("/delete/:id", actionDelete);

module.exports = router;
