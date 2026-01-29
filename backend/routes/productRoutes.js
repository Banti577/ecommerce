const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const { addProduct, getAllProducts, getProductById, deleteProduct, updateProduct, searchProducts, fetchSellerProducts } = require('../controller/productController');

const { verifyjwttoken } = require('../services/Authentication');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/productImages"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);

    }
})
const upload = multer({ storage: storage }).array("image", 5);


router.get('/products/my', verifyjwttoken('token'),  fetchSellerProducts);


router.get('/products/search', searchProducts)
router.get('/products', getAllProducts)
router.get('/products/:id', getProductById)

router.use(verifyjwttoken('token'))


router.post('/products', upload, addProduct)
router.patch('/products/:id', upload, updateProduct);
router.delete('/products/:id', deleteProduct)


module.exports = router;