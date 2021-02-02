const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router()


// INDEX CONTROLLER
router.get('/dashboard', adminController.viewDashboard) 
router.get('/category', adminController.viewCategory)
router.get('/items', adminController.viewItems)
router.get('/banks', adminController.viewBanks)
router.get('/booking', adminController.viewBooking)


// POST CONTROLLER => Add something to DB
router.post('/category', adminController.postCategory) 


// UPDATING data
router.post('/category/update', adminController.updateCategory)

// DELETING data
router.post('/category/delete', adminController.deleteCategory)

module.exports = router