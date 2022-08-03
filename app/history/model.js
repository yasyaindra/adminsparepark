const mongoose = require("mongoose");

let historySchema = mongoose.Schema(
  {
    kodeBarang: {
      type: String,
      require: [true, "Kode harus diisi"],
    },
    name: {
      type: String,
      require: [true, "nama barang harus diisi"],
    },
    rak: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rak",
    },
    namaPengambil: {
      type: String,
      require: [true, "pengambil harus diisi"],
    },
    tipeBarang: {
      type: String,
      require: [true, "tipe barang harus diisi"],
    },
    quantityDiambil: {
      type: Number,
      require: [true, "quantity harus diisi"],
    },
    status: {
      type: String,
      require: [true, "status harus diisi"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);
