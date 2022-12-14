const mongoose = require("mongoose");

let rakSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Nama rak harus diiisi"],
    },
    kodeRak: {
      type: Number,
      require: [true, "Nama kode rak harus diiisi"],
    },
    gudang: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gudang",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rak", rakSchema);
