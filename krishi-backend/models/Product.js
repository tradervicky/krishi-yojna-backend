const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title : {type : String, required : true},
    vendor : {type : String, required : true},
    vendorName : {type: String, required: true},
    vendorMobile : {type: String, required : true},
    image : { type : String},
    price : { type : String, required : true},
    category : {type : String, required : true},
    subCategory : {type : String},
    quantity : {type : String, required : true},
    description : {type : String},
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('products', productSchema)