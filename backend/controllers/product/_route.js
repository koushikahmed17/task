const express=require('express');
const { addProduct, getAllProducts, getSpecificProduct, updateProduct, deleteProduct, getAllCategories, fileterProducts } = require('.');
const upload = require('../../middleware/multerConfig');
const router=express.Router();

// this route is for seller 
router.post('/addProducts',upload.single('image'),addProduct)
router.get('/getAllProducts',getAllProducts)
router.get('/getSpecificProduct/:id',getSpecificProduct)
router.patch('/updateProduct/:id',updateProduct)
router.delete('/deleteProduct/:id',deleteProduct)
router.get('/getAllCategories',getAllCategories)
router.get('/filterProduct',fileterProducts)

//


//this route is for customer 




module.exports=router