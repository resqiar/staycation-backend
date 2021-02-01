const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router()


// pass to controller 
router.get('/dashboard', adminController.viewDashboard) 
router.get('/category', adminController.viewCategory)
router.get('/items', adminController.viewItems)
router.get('/banks', adminController.viewBanks)
router.get('/booking', adminController.viewBooking)


module.exports = router