const Order = require('../models/order.model')
const User = require('../models/user.model')
const Product = require('../models/product.model');

const addOrder = async (req,res) => {
    const {userId, items, trackingNumber , orderId,status} = req.body;

    const user = await User.findById(userId);

    const itemPromis = items.map(async (itm) => {
        const product = await Product.findById(itm.product)
        return {
            product : product ,
            quantity : itm.quantity
        };
    })

    const ITEMS = await Promise.all(itemPromis);

    const total = items.reduce((acc, itm) => acc + (itm.quantity * 200), 0);

    const order = {
        user : user,
        items : ITEMS,
        orderId : orderId,
        trackingNumber : trackingNumber,
        totalAmount : total,
        status : status
    }

    const uploadedOrder = await Order.create(order);

    res.json(uploadedOrder);
}

module.exports = {
    addOrder
}

// user: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User', 
//         required: true 
//     },
//     // Array of products in this specific order
//     items: [{
//         product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//         quantity: { type: Number, default: 1 },
//         priceAtPurchase: { type: Number } // Important if prices change later
//     }],
//     // The "Journey" of the package
//     status: {
//         type: String,
//         enum: ['Packaging', 'Shipped', 'On the Way', 'Delivered'],
//         default: 'Packaging'
//     },
//      // For the AI to look up
//     orderId: { 
//         type: String, 
//         unique: true, 
//         required: true // e.g., "RAY-10234"
//     },
//     trackingNumber: { type: String, default: "" },
//     totalAmount: { type: Number, required: true },
//     createdAt: { type: Date, default: Date.now }