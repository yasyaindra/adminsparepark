const mongoose = require("mongoose");

let vendorSchema = mongoose.Schema(
  {
    nameVendor: {
      type: String,
      require: [true, "Nama game harus diisi"],
    },
    tanggalPO: {
      type: Date,
    },
    nomorPO: {
      type: String,
      require: [true, "Jumlah quantity harus diisi"],
    },
    penerima: {
      type: String,
    },
    item: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    keterangan: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);
