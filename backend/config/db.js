const mongoose=require('mongoose')
const UserSchema=require('../models/schema/User');
const { hashPassword } = require('../utility/hashPassword');
exports.ConnectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const adminData={
            name:"admin",
            email:"admin@gmail.com",
            password:"admin",
            role:"admin"
        }
        const adminExist=await UserSchema.findOne({email:adminData.email})
   
        if (!adminExist) {
            
            const password=await hashPassword(adminData.password)
    
           const addedAdmin= await UserSchema.create({...adminData,password})
           if (addedAdmin) {
            console.log("Admin added successfully");
           }
        }
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}