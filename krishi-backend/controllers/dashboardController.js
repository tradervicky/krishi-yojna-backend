const mongoose = require('mongoose');
const Products = require('../models/Product')
const Customers = require('../models/User')
const Card = require('../models/cards')
const Vendor = require('../models/Vendor')
const getDashboardStats = async (req, resp)=>{
    try {
        // total products
        const totalProduct = await Products.countDocuments();
        // console.log("total Product : ",totalProduct)

        // total customers
        const totalCustomer = await Customers.countDocuments();
        // console.log("total Cusomer", totalCustomer)

        // total cards
        const totalActivatedCards = await Card.countDocuments({ isActivated: true });
        const totalDeactivatedCards = await Card.countDocuments({ isActivated: false });

        // console.log("totalActivatedCards",totalActivatedCards)
        // console.log("totalDeactivatedCards",totalDeactivatedCards)

        // Total vendors 

        const totalVendor = await Vendor.countDocuments();
        // products and their no.
        const productsNumber = await Products.find({}, { title: 1, quantity: 1 })
        .sort({ createdAt: 1 })
        .limit(5)
        resp.status(200).json({data:{totalProduct,totalCustomer,totalActivatedCards,totalDeactivatedCards,totalVendor, productsNumber}, message: "Successfully fetched dashboard data"});
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = getDashboardStats;