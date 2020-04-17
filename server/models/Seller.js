const { Schema, model } = require('mongoose');

const SellerSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    document: {
      type: String,
      required: true,
    },
    sales: [{
      code: String,
      price: String,
      date: String
    }],
}, {
    timestamps: true,
});

module.exports = model('Seller', SellerSchema);
