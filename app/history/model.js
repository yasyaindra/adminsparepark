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
      type: String,
      require: [true, "rak harus diisi"],
    },
    namaPengambil: {
      type: String,
      require: [true, "pengambil harus diisi"],
    },
    quantityDiambil: {
      type: Number,
      require: [true, "quantity harus diisi"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);
