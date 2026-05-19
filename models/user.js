const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // ensures no duplicate users
      lowercase: true, // normalizes email casing
      trim: true,
    },
    cart: {
      items: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            min: 1,
          },
        },
      ],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

userSchema.methods.addToCart = async function (prodId) {
  const cartProductIndex = this.cart.items.findIndex(
    item => item.productId.toString() === prodId.toString()
  );

  let updatedItem;
  if (cartProductIndex >= 0) {
    this.cart.items[cartProductIndex].quantity += 1;
    updatedItem = this.cart.items[cartProductIndex];
  } else {
    updatedItem = { productId: prodId, quantity: 1 };
    this.cart.items.push(updatedItem);
  }

  await this.save();
  return updatedItem;
};

userSchema.methods.deleteItemFromCart = async function (prodId) {
  this.cart.items = this.cart.items.filter(
    item => item.productId.toString() !== prodId.toString()
  );
  return this.save();
};

module.exports = mongoose.model('User', userSchema);