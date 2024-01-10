const mongoose = require("mongoose");


const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
}, {
  timestamps: true,
  collection: COLLECTION_NAME
});

module.exports = mongoose.model(DOCUMENT_NAME, productSchema);