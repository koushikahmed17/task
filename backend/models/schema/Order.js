const mongoose = require("mongoose");
const counterScehma=require('./Counter')

const orderSchema=new mongoose.Schema({
    orderId:{
        type:String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    products:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product',
            required:true
        },
        quantity:{
            type:Number,
            required:true
        }
    }],
    totalAmount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['pending','processing','shipped','delivered'],
        default:'pending'
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    updateAt:{
        type:Date,
        default:Date.now
    }
})


orderSchema.pre('save', async function (next) {
  if (!this.isNew) return next();

  try {
    const orderCounter = await counterScehma.findOneAndUpdate(
      { name: 'orderId' },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

    if (!orderCounter) {
      console.error('Failed to create or find counter document');
      return next(new Error('Counter document missing'));
    }
 console.log(orderCounter,'adfasffasdfdf')
    const padded = orderCounter.count.toString().padStart(2, '0');
    this.orderId = `ORD-${padded}`;
    console.log(`Generated Order ID: ${this.orderId}`);
    next();
  } catch (error) {
    next(error);
  }
});


module.exports=mongoose.model('Order',orderSchema)