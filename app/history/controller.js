const History = require("./model");
const Gudang = require("../gudang/model");
const Item = require("../item/model");
const moment = require("moment");
const { findGudang } = require("../../utils/utils");

module.exports = {
  index: async (req, res) => {
    try {
      const history = await History.find();
      const gudang = await Gudang.find();

      const namaGudang = findGudang(history, gudang);

      res.render("admin/history/view_history", {
        history,
        namaGudang,
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
