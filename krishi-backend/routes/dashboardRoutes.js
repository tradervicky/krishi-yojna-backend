const express = require('express');
const router = express.Router();
const getDashboardStats = require('../controllers/dashboardController')

// Define the route for getting dashboard statistics
router.get('/stats', getDashboardStats);

module.exports = router;
