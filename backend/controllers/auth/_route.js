const express=require('express');
const { login, updtaeUser } = require('.');
const { register } = require('.');
const { decodeUser } = require('../../middleware/decodeUser');
const router=express.Router();


router.post('/login',login)
router.post('/register',register)
router.post('/updateUser',decodeUser,updtaeUser)



module.exports=router