const Gudang = require("./model");
const Rak = require("./model");

module.exports = {
  index: async (req, res, next) => {
    try {
      const gudang = await Gudang.find().populate("rak");

      res.render("admin/gudang/view_gudang", {
        title: "Daftar Gudang",
        gudang,
      });
    } catch (error) {
      res.redirect("/");
    }
  },
  viewCreate: async (req, res, next) => {
    try {
      res.render("admin/gudang/create", {
        title: "Halaman Tambah Gudang",
      });
    } catch (error) {
      res.redirect("/gudang");
    }
  },
  actionCreate: async (req, res, next) => {
    try {
      const { name } = req.body;
      let gudang = await Gudang({ name });
      await gudang.save();
      res.redirect("/gudang");
    } catch (error) {
      res.redirect("/gudang");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const gudang = await Gudang.findOne({ _id: id });

      res.render("admin/gudang/edit", {
        gudang,
        title: "Halaman ubah Gudang",
      });
    } catch (err) {
      res.redirect("/gudang");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      await Gudang.findOneAndUpdate(
        {
          _id: id,
        },
        { name }
      );

      res.redirect("/gudang");
    } catch (err) {
      res.redirect("/gudang");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Gudang.findOneAndRemove({
        _id: id,
      });

      res.redirect("/gudang");
    } catch (err) {
      res.redirect("/gudang");
    }
  },
};
