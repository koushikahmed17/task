
const UserSchema=require('../../models/schema/User')
const { generateToken } = require('../../utility/genereateToken')
const {  hashPassword, verifyPassword } = require('../../utility/hashPassword')

exports.login=async(req,res)=>{

const user=await UserSchema.findOne({email:req.body.email})

if (user) {
    const isMatch=await verifyPassword(req.body.password,user.password)
    if (isMatch) {
        const token= await generateToken(user._id)

        res.cookie('user',token,{httpOnly:true})
     return   res.send({message:'Login successfully'})
    }else{
        res.send({message:'Invalid password'})
    }
}else{
    res.send({message:'User not found'})
}


}

exports.register=async(req,res)=>{
    console.log(req.body,'this is for register')
    const user=await UserSchema.findOne({email:req.body.email})
    if (user) {
        res.send({message:'User already exist'})
    }else{
    const password=await hashPassword(req.body.password)

    if (password) {
        const user=new UserSchema({...req.body,password})
        const token= generateToken(user._id)
        user.save()
    res.cookie('user',token,{httpOnly:true})
    res.send({message:'User added successfully'}
    )    
    }
    else{
        res.send({message:'something is wrong'})
    }
}
}