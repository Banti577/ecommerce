const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    index: true
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String, 
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity cannot be less than 1']
    },
    priceAtPurchase: { 
      type: Number, 
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentIntentId: { 
    type: String,
    unique: true,
    sparse: true
  },
  addressToDeliver: {
    street: String,
    city: String,
    zipCode: String,
    country: String
  }
}, { 
  timestamps: true, 
  versionKey: false 
});

orderSchema.index({ createdAt: -1 }); 

module.exports = mongoose.model('Order', orderSchema);
