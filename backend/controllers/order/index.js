const Product = require('../../models/schema/Product');
const Order = require('../../models/schema/Order');

exports.createOrder = async (req, res) => {
  try {
    const { products } = req.body;
    const userId = res.locals.user.id;

    if (!userId || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Missing userId or products' });
    }

    let totalAmount = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }

      totalAmount += product.price * item.quantity;
    }

    // Now create order (orderId will be set in pre-save middleware)
    const order = new Order({
      userId,
      products,
      totalAmount
    });

    await order.save(); // ✅ Wait for pre-save middleware to finish

    res.status(201).json({
      message: 'Order added successfully',
      order
    });

  } catch (err) {
    console.error('Order creation failed:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getAllOrders=async(req,res)=>{
   const userId = res.locals.user.id;
   const role=res.locals.user.role
   let query={}
   if (role==='customer') {

    query.userId=userId
    
   }


  const orders=await Order.find(query).populate('products.productId').populate('userId','name email role')
  res.send(orders)
}

exports.getSpecificOrder=async(req,res)=>{
  const order=await Order.findById(req.params.id).populate('products.productId').populate('userId','name email role')
  res.send(order)
}


exports.updataOrderStatus=async(req,res)=>{
  const order=await Order.findByIdAndUpdate(req.params.id,req.body,{new:true}).populate('products.productId').populate('userId','name email role')
  res.send(order)
}