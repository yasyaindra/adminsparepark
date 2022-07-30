const Gudang = require("../gudang/model");
const Rak = require("../rak/model");
const Item = require("../item/model");
const Vendor = require("../vendor/model");

module.exports = {
  index: async (req, res) => {
    try {
      const gudang = await Gudang.countDocuments();
      const rak = await Rak.countDocuments();
      const item = await Item.countDocuments();
      const vendor = await Vendor.countDocuments();

      res.render("admin/dashboard/view_dashboard", {
        title: "Halaman Dashboard",
        count: {
          gudang,
          rak,
          item,
          vendor,
        },
      });
    } catch (err) {
      console.log(err);
    }
  },
};
