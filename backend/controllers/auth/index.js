
const UserSchemarequire=require('../../models/schema/User')

exports.login=async(req,res)=>{

const user=new UserSchemarequire({...req.body})
user.save()
    res.send({message:'User added successfully',user})
}