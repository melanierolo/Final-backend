import mongoose from 'mongoose';

// Define the product schema
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    max: 100,
  },
  price: {
    type: Number,
  },
  thumbnailImg: {
    type: String,
  },
  code: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: { type: String },
  availability: { type: String, enum: ['in stock', 'out of stock'] },
});

//Create the Model
const Product = mongoose.model('Product', productSchema);

//Export the Model
export default Product;
