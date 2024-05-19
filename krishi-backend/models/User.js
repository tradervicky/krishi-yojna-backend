const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: String, required: true }, 
  password: { type: String, required: true },
  address: { type: String, required: true },
  panCard: { type: String },
  aadharCard: { type: String },
  isBlocked: { type: Boolean, default: false }, 
  createdAt: { type: Date, default: Date.now }, 
  updatedAt: { type: Date, default: Date.now }, 
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isEmailVerified: { type: Boolean, default: false },

  // Embedded schema for cards (array of objects)
  cards: [{
    type: { type: String, required: true }, // Card type (e.g., credit, debit)
    number: { type: String, required: true }, // Encrypted or masked card number for security
    expiryDate: { type: Date, required: true },
    cvv: { type: String, required: true }, // Securely store CVV (consider hashing)
    bankName: { type: String },
    isDefault: { type: Boolean, default: false }, // Indicate default card
  }],

  // Embedded schema for invoices (array of objects)
  invoices: [{
    invoiceNumber: { type: String, required: true }, // Unique invoice number
    amount: { type: Number, required: true }, // Invoice amount
    date: { type: Date, required: true }, // Invoice date
    dueOn: { type: Date }, // Due date (optional)
    items: [{ // Array of items (optional, for detailed invoices)
      name: { type: String, required: true },
      description: { type: String },
      quantity: { type: Number, default: 1 },
      price: { type: Number, required: true },
    }],
    notes: { type: String }, // Additional notes (optional)
  }],
});

module.exports = mongoose.model('users', userSchema);

