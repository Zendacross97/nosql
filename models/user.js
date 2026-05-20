const mongoose = require('mongoose');
const Order = require('./order');

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
    order: {
      items: []
    }
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

userSchema.methods.addOrder = async function () {
  // populate cart items with product details
  await this.populate('cart.items.productId');

  const orderItems = this.cart.items.map(item => {
  const {title, price, description, imageUrl } = item.productId;
  return {
    product: { title, price, description, imageUrl },
    quantity: item.quantity,
  };
});

  const order = new Order({
    items: orderItems,
    user: {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
  });

  await order.save();

  // clear cart
  this.cart = { items: [] };
  await this.save();

  return order.items;
};

userSchema.methods.getOrders = async function () {
  const orders = await Order.find({ 'user._id': this._id });
  return orders[0].items;
};

module.exports = mongoose.model('User', userSchema);