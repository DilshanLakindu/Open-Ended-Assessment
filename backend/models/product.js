import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      color: {
        type: String,
      },
      size: {
        type: String,
      },
      categories:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
      },
  gender: {
    type: String
  },
  category: {
    type: String
  },
  productImage:{
        type: String
      },
  description: {
        type: String
      }
});

export default model('Product', ProductSchema); 