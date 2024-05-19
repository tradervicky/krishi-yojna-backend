const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    vendorCode: { type: String, required: true },
    gstIn: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    panCard: { type: String },
    aadharCard: { type: String},
    businessDoc: { type: String}
});

module.exports = mongoose.model('Vendors', vendorSchema);
