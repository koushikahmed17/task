const express=require('express');
const router=express.Router();
const productRoute=require('../controllers/product/_route')


router.use('/product',productRoute)



module.exports=router