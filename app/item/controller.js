const Item = require("./model");
const Rak = require("../rak/model");
const Gudang = require("../gudang/model");
const History = require("../history/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");
var moment = require("moment");

module.exports = {
  index: async (req, res) => {
    try {
      const item = await Item.find().populate("rak");

      res.render("admin/item/view_item", {
        item,
        moment,
        title: "Halaman item",
      });
    } catch (err) {
      res.redirect("/item");
    }
  },
  viewCreate: async (req, res) => {
    try {
      const gudang = await Gudang.find().populate("rak");

      res.render("admin/item/create", {
        gudang,
        title: "Halaman tambah item",
      });
    } catch (err) {
      res.redirect("/item");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const {
        name,
        tipeBarang,
        jenisBarang,
        quantity,
        bagian,
        rak,
        minimStock,
        keterangan,
      } = req.body;

      const kodeBarang = `${(Math.random() + 1)
        .toString(36)
        .substring(7)
        .toUpperCase()}`;

      const history = await History({
        name,
        rak,
        quantityDiambil: quantity,
        kodeBarang,
        namaPengambil: "USER",
        status: "DITAMBAH",
      });

      await history.save();

      if (req.file) {
        let tmp_path = req.file.path;
        let originaExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originaExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on("end", async () => {
          try {
            const item = new Item({
              name,
              tipeBarang,
              jenisBarang,
              quantity,
              bagian,
              minimStock,
              rak,
              keterangan,
              kodeBarang,
              thumbnail: filename,
            });

            await item.save();

            res.redirect("/item");
          } catch (err) {
            res.redirect("/item");
          }
        });
      } else {
        const item = new Item({
          name,
          tipeBarang,
          jenisBarang,
          minimStock,
          quantity,
          bagian,
          rak,
          keterangan,
        });

        await item.save();

        res.redirect("/item");
      }
    } catch (err) {
      res.redirect("/item");
    }
  },
  viewDetail: async (req, res) => {
    try {
      const { id } = req.params;

      const item = await Item.findOne({ _id: id }).populate([
        {
          path: "rak",
          populate: [{ path: "gudang" }],
        },
      ]);

      res.render("admin/item/detail", {
        item,
        title: "Detail Item",
      });
    } catch (error) {
      res.redirect("/item");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const item = await Item.findOne({ _id: id }).populate("rak");
      const gudang = await Gudang.find().populate("rak");

      selected(item, gudang);

      res.render("admin/item/edit", { title: "Ubah Item", item, gudang });
    } catch (error) {
      res.redirect("/item");
    }
  },
  viewSearch: async (req, res) => {
    try {
      const { kodeBarang } = req.query;

      if (kodeBarang) {
        const item = await Item.find({ kodeBarang }).populate("rak");

        res.render("admin/item/transaction", { title: "Transaksi", item });
      } else {
        res.render("admin/item/search", { title: "Cari Search" });
      }
    } catch (error) {
      res.redirect("/item");
    }
  },
  actionHistory: async (req, res) => {
    try {
      const { id } = req.params;
      const { quantityDiambil } = req.body;

      console.log(req.body);

      const history = await History(req.body);

      await history.save();

      try {
        const db = await Item.findOneAndUpdate(
          {
            _id: id,
          },
          {
            $inc: {
              quantity: -parseInt(quantityDiambil),
            },
          },
          {
            upsert: true,
            new: true,
          }
        );
      } catch (error) {
        res.redirect("/item");
      }

      res.redirect("/item/search");
    } catch (error) {
      res.redirect("/item/search");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name,
        tipeBarang,
        jenisBarang,
        quantity,
        bagian,
        rak,
        keterangan,
      } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originaExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originaExt;
        let target_path = path.resolve(
          config.rootPath,
          `public/uploads/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on("end", async () => {
          try {
            const item = await Item.findOne({ _id: id });

            let currentImage = `${config.rootPath}/public/uploads/${item.thumbnail}`;
            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage);
            }

            await Item.findOneAndUpdate(
              {
                _id: id,
              },
              {
                name,
                tipeBarang,
                jenisBarang,
                quantity,
                bagian,
                rak,
                keterangan,
                thumbnail: filename,
              }
            );

            res.redirect("/item");
          } catch (err) {
            res.redirect("/item");
          }
        });
      } else {
        await Item.findOneAndUpdate(
          {
            _id: id,
          },
          {
            name,
            tipeBarang,
            jenisBarang,
            quantity,
            bagian,
            rak,
            keterangan,
          }
        );

        res.redirect("/item");
      }
    } catch (err) {
      res.redirect("/item");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      const item = await Item.findOneAndRemove({ _id: id });

      let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnial}`;
      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }

      res.redirect("/item");
    } catch (error) {
      res.redirect("/item");
    }
  },
};
