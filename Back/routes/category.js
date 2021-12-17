const express = require("express");
const router = express.Router();
const categoryCtrl = require("../controllers/category");

router.post('/', categoryCtrl.insertCategory);
router.put('/:id', categoryCtrl.updateCategory);
router.delete('/:id', categoryCtrl.deleteCategory);
router.get('/:id', categoryCtrl.getOneCategory)
router.get('/', categoryCtrl.getAllCategory)

module.exports = router;