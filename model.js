const mongoose = require("mongoose");

const FoodsSchema = new mongoose.Schema(
  {
    linkFood: { type: String, required: true },
    titleFood: { type: String, required: true },
    linkImage: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "testfoods",
  }
);

const FoodsModel = mongoose.model("testfoods", FoodsSchema);

module.exports = FoodsModel;
