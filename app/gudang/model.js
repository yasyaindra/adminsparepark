const mongoose = require("mongoose");

let gudangSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Nama gudang harus diiisi"],
    },
    rak: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rak",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gudang", gudangSchema);
