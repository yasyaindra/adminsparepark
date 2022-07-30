const Gudang = require("../gudang/model");
const Rak = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const rak = await Rak.find().populate("gudang");

      // const gudangAndRak = findRakAndGudangById(gudang);

      res.render("admin/rak/view_rak", {
        title: "Halaman Rak",
        rak,
      });
    } catch (error) {
      res.redirect("/rak");
    }
  },
  viewCreate: async (req, res) => {
    try {
      const gudang = await Gudang.find();
      res.render("admin/rak/create", { title: "Halaman Rak", gudang });
    } catch (error) {
      res.redirect("/rak");
    }
  },
  actionCreate: async (req, res) => {
    const { name, gudang } = req.body;
    const newRak = new Rak({ name, gudang });

    try {
      const savedRak = await newRak.save();
      try {
        await Gudang.findByIdAndUpdate(gudang, {
          $push: { rak: savedRak._id },
        });
      } catch (error) {
        res.redirect("/rak");
      }
      res.redirect("/rak");
    } catch (err) {
      res.redirect("/rak");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const rak = await Rak.findOne({ _id: id }).populate("gudang");
      const gudang = await Gudang.find();

      // const contoh = gudang._id === rak.gudang._id ? "selected" : "";

      res.render("admin/rak/edit", { title: "Ubah Rak", rak, gudang });
    } catch (error) {}
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, gudang } = req.body;

      await Rak.findOneAndUpdate({ _id: id }, { name, gudang });

      res.redirect("/rak");
    } catch (error) {
      res.redirect("/rak");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Rak.findOneAndRemove({ _id: id });
      res.redirect("/rak");
    } catch (error) {
      res.redirect("/rak");
    }
  },
};
