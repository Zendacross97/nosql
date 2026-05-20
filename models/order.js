const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        product: {
          title: { type: String, required: true },
          price: { type: Number, required: true },         
          description: { type: String, required: true, trim: true },
          imageUrl: { type: String, required: true }
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    user: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
