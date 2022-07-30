var express = require("express");
var router = express.Router();
const {
  index,
  viewCreate,
  actionCreate,
  viewDetail,
  viewEdit,
  viewSearch,
  actionHistory,
  actionEdit,
  actionDelete,
} = require("./controller");
const multer = require("multer");
const os = require("os");

/* GET home page. */
router.get("/", index);
router.get("/create", viewCreate);
router.post(
  "/create",
  multer({ dest: os.tmpdir() }).single("image"),
  actionCreate
);
router.get("/detail/:id", viewDetail);
router.get("/edit/:id", viewEdit);
router.put(
  "/edit/:id",
  multer({ dest: os.tmpdir() }).single("image"),
  actionEdit
);
router.get("/search", viewSearch);
router.delete("/delete/:id", actionDelete);
router.put("/history/:id", actionHistory);

module.exports = router;
