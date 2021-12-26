const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/product");;

router.post('/', productCtrl.insertProduct);
router.put('/:id', productCtrl.updateProduct);
router.delete('/:id', productCtrl.deleteProduct);
router.get('/:id', productCtrl.getOneProduct)
router.get('/category/:id', productCtrl.getProductByCategory)
router.get('/name/:name', productCtrl.getProductsByName)
router.get('/', productCtrl.getAllProduct)

module.exports = router;