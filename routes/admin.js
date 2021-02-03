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
router.post('/banks', adminController.postBanks)


// UPDATING data
router.post('/category/update', adminController.updateCategory)
router.post('/banks/update', adminController.updateBanks)

// DELETING data
router.post('/category/delete', adminController.deleteCategory)
router.post('/banks/delete', adminController.deleteBanks)

module.exports = router