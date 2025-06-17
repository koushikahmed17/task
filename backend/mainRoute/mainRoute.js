const express=require('express');
const router=express.Router();
const productRoute=require('../controllers/product/_route')
const authRoute=require('../controllers/auth/_route')

router.use('/product',productRoute)

router.use('/auth',authRoute)

module.exports=router