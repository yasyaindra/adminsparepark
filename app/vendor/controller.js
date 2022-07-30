const Vendor = require("./model");
const Item = require("../item/model");
const History = require("../history/model");
const Gudang = require("../gudang/model");
const moment = require("moment");
const { findGudang } = require("../../utils/utils");

module.exports = {
  index: async (req, res) => {
    try {
      const vendor = await Vendor.find().populate("item");

      res.render("admin/vendor/view_vendor", {
        title: "Daftar Vendor",
        vendor,
        moment,
      });
    } catch (error) {
      res.redirect("/vendor");
    }
  },
  viewCreate: async (req, res) => {
    try {
      const item = await Item.find();

      res.render("admin/vendor/create", {
        title: "Tambah Vendor",
        item,
      });
    } catch (error) {
      res.redirect("/vendor");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const vendor = await Vendor(req.body);
      await vendor.save();
      res.redirect("/vendor");
    } catch (error) {
      res.redirect("/vendor");
    }
  },
  viewDetail: async (req, res) => {
    try {
      const { id } = req.params;

      const vendor = await Vendor.findOne({ _id: id }).populate("item");

      res.render("admin/vendor/detail", {
        title: "Detail Vendor",
        vendor,
        moment,
      });
    } catch (error) {
      res.redirect("/vendor");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const vendor = await Vendor.findOne({ _id: id }).populate("item");
      const item = await Item.find();

      console.log("ini item", item);
      console.log("ini item dari vendor", vendor.item);

      res.render("admin/vendor/edit", {
        title: "Ubah Edit",
        vendor,
        moment,
        item,
      });
    } catch (error) {
      res.redirect("/vendor");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { nameVendor, tanggalPO, nomorPO, penerima, item } = req.body;

      const vendor = await Vendor.findOneAndUpdate(
        { _id: id },
        { nameVendor, tanggalPO, nomorPO, penerima, item }
      );
      res.redirect("/vendor");
    } catch (error) {
      res.redirect("/vendor");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Vendor.findOneAndRemove({ _id: id });
      res.redirect("/vendor");
    } catch (error) {
      res.redirect("/vendor");
    }
  },
};
