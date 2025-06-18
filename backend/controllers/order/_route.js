const express=require('express');
const { createOrder, getAllOrders, updataOrderStatus } = require('.');
const { decodeUser } = require('../../middleware/decodeUser');
const router=express.Router();


router.post('/createOrder',decodeUser,createOrder)//this router is only for customer
// this is is using both seller and customer
router.get('/getAllOrders',decodeUser,getAllOrders)
router.get('/getSpecificOrder/:id',getSpecificOrder)
router.patch('/updatdateOrderStatus/:id',updataOrderStatus)
module.exports=router




