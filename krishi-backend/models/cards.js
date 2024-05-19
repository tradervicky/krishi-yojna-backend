const mongoose = require('mongoose');

// Define the transaction schema
const transactionSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice', required: true },
    productId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
    type: { type: String, required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true }
});

// Define the card schema with nested transaction schema

const cardSchema = new mongoose.Schema({
    balance: { type: Number, required: true },
    cardNumber: { type: String, required: true },
    cardType: { type: String, required: true },
    cvv: { type: String, required: true },
    expMonth: { type: String, required: true },
    expYear: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    debitCreditHistory: { type: [transactionSchema], default: [] },
    isActivated: { type: Boolean, default: true },
    updatedAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// Pre-save middleware to automatically update `updatedAt` before saving
cardSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Pre-update middleware to automatically update `updatedAt` before updating
cardSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: Date.now() });
    next();
});

cardSchema.pre('updateOne', function(next) {
    this.set({ updatedAt: Date.now() });
    next();
});

cardSchema.pre('updateMany', function(next) {
    this.set({ updatedAt: Date.now() });
    next();
});

cardSchema.pre('update', function(next) {
    this.set({ updatedAt: Date.now() });
    next();
});

// Create the Card model
const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
