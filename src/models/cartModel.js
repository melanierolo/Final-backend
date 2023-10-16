import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: [
    {
      qty: Number,
      product: {
        type: Schema.ObjectId,
        ref: 'Product', // This references the 'products' collection
      },
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
