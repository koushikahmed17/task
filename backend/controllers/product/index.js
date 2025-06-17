const productSchema=require('../../models/schema/Product')
const categorySchema=require('../../models/schema/Category')
const addCategory = async (category) => {
  console.log(category, 'this is the category what I need');

  const existingCategory = await categorySchema.findOne({ name: category });

  if (existingCategory) {
    return existingCategory._id;
  } else {
    const newCategory = new categorySchema({ name: category });
    await newCategory.save();
    return newCategory._id;
  }
};

exports.fileterProducts=async(req,res)=>{
    const {text,categoryId,status}=req.query

 let filter = {}

if (text) {
    filter.$or = [
        { name: { $regex: text, $options: "i" } },
        { sku: { $regex: text, $options: "i" } }
    ];
}

    if(categoryId){
        filter.category=categoryId
    }
    if(status){
        filter.status=status
    }
    const products=await productSchema.find(filter).populate('category')
    res.send(products)

}

exports.getAllCategories=async(req,res)=>{
    const categories=await categorySchema.find()
    res.send(categories)
}

exports.addProduct=async(req,res)=>{

console.log(req.body,'this is for add products ')
const categoryId=await addCategory(req.body.category)
    const product=new productSchema({...req.body,image:`/uploads/${req.file.filename}`,category:categoryId})
    await product.save()


    res.send({message:'Product added successfully',product})

}



exports.getAllProducts=async(req,res)=>{
    const products=await productSchema.find().populate('category')
    res.send(products)
}


exports.getSpecificProduct=async(req,res)=>{
    const product=await productSchema.findById(req.params.id).populate('category')
    res.send(product)
}

exports.updateProduct=async(req,res)=>{
    const product=await productSchema.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.send(product)
}
exports.deleteProduct=async(req,res)=>{
    const product=await productSchema.findByIdAndDelete(req.params.id)
    res.send(product)
}


