const mongoose = require("mongoose");

const DOCUMENT_NAME = "Oder";
const COLLECTION_NAME = "Oders";

const orderSchema = new mongoose.Schema(
  {
    product: [
      {
        product: { type: Object, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    user: {
      name: {
        type: String,
        required: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        requided: true,
        ref: "User",
      },
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = mongoose.model(DOCUMENT_NAME, orderSchema);
