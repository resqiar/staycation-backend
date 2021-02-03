const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router()

// ! Multer for uploading image middleware
const upload = require('../middlewares/Multer')

// INDEX CONTROLLER
router.get('/dashboard', adminController.viewDashboard) 
router.get('/category', adminController.viewCategory)
router.get('/items', adminController.viewItems)
router.get('/banks', adminController.viewBanks)
router.get('/booking', adminController.viewBooking)


// POST CONTROLLER => Add something to DB
router.post('/category', adminController.postCategory) 
router.post('/banks', upload , adminController.postBanks) // ? => using multer middlewae


// UPDATING data
router.post('/category/update', adminController.updateCategory)
router.post('/banks/update', upload, adminController.updateBanks)

// DELETING data
router.post('/category/delete', adminController.deleteCategory)
router.post('/banks/delete', adminController.deleteBanks)

module.exports = router