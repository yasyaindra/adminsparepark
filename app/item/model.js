const mongoose = require("mongoose");

let itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Nama game harus diisi"],
    },
    tipeBarang: {
      type: String,
      require: [true, "Nama tipe harus diisi"],
    },
    jenisBarang: {
      type: String,
      require: [true, "Nama jenis harus diisi"],
    },
    quantity: {
      type: Number,
      require: [true, "Jumlah quantity harus diisi"],
    },
    minimStock: {
      type: Number,
      require: [true, "Minim stock harus diisi"],
    },
    bagian: {
      type: String,
      enum: ["Mekanik", "Elektrik", "General", "Forklif"],
      required: true,
    },
    rak: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rak",
    },
    thumbnail: {
      type: String,
    },
    keterangan: {
      type: String,
    },
    kodeBarang: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
