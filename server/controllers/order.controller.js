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
