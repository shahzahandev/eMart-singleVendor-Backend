const multer = require('multer');

// Image upload for Create Product Controller
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/product')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix) + '-' + file.orginalName
  }
});
exports.uploadProductImg = multer({ storage: storage });



// Image upload for Update Product Controller
const storageUpdateProduct = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/UpdateProduct')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix) + '-' + file.orginalName
  }
});
exports.updateProductImg = multer({ storage: storageUpdateProduct });

