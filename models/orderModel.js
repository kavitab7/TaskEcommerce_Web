const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
        }
    ],
    buyer: {
        type: mongoose.ObjectId,
        ref: "user",
    },
    status: {
        type: String,
        default: "Processing",
        enum: ["Processing", "Shipped", "delivered", "cancel"],
    },
}, { timestamps: true }
)

module.exports = mongoose.model("Order", orderSchema);