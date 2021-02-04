const multer = require('multer')
const fs = require('fs');
const path = require('path');


const storage = multer.diskStorage({
    destination: "public/images",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single("image")

const itemStorage = multer.diskStorage({
    destination: "public/images/items",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const uploadMultiple = multer({
    storage: itemStorage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file ,cb) => {
        checkFileType(file, cb);
    }
}).array('item-images', 12)


// Check file Type
const checkFileType = (file, cb) => {

    // Allowed file type
    const fileTypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("File not allowed");
    }
}

module.exports = {upload, uploadMultiple}