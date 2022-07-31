const History = require("./model");
const Gudang = require("../gudang/model");
const Item = require("../item/model");
const moment = require("moment");
const { findGudang } = require("../../utils/utils");

module.exports = {
  index: async (req, res) => {
    try {
      const history = await History.find().populate([
        {
          path: "rak",
          populate: [{ path: "gudang" }],
        },
      ]);

      console.log("ini history: ", history);

      res.render("admin/history/view_history", {
        history,
        moment,
        title: "Halaman metode pembayaran",
      });
    } catch (err) {
      res.redirect("/history");
    }
  },
  actionDrop: async (req, res) => {
    try {
      await History.remove();
      res.redirect("/history");
    } catch (error) {
      res.redirect("/history");
    }
  },
};
