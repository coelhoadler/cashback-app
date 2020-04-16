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
    }
}, {
    timestamps: true,
});

module.exports = model('Seller', SellerSchema);
