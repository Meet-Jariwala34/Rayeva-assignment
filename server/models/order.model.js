const mongoose = require('mongoose');

//Schemas
const orderSchema = {
    // Link to the UserId who bought it
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    // Array of products in this specific order
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
    }],
    // The "Journey" of the package
    status: {
        type: String,
        enum: ['Packaging', 'Shipped', 'On the Way', 'Delivered'],
        default: 'Packaging'
    },
     // For the AI to look up
    orderId: { 
        type: String, 
        unique: true, 
        required: true // e.g., "RAY-10234"
    },
    trackingNumber: { type: String, default: "" },
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
}

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;