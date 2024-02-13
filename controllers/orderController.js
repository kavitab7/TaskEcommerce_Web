const orderModel = require("../models/orderModel");


const createOrder = async (req, res) => {
    try {
        const { products, buyer } = req.body;
        if (!products || !buyer) {
            return res.status(400).send({
                success: false,
            })
        }
        const order = await new orderModel({ products, buyer }).save();
        return res.status(201).send({
            success: true,
            order
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: " error in order ",
            error,
        })
    }
}

//get particular user orders
const userOrders = async (req, res) => {
    try {
        const { uid } = req.body;
        const orders = await orderModel.find({ buyer: uid }).populate('products');
        return res.status(200).send({
            success: true,
            orders
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: " error in getting user orders ",
            error,
        })
    }
}

const allOrders = async (req, res) => {
    console.log('hhh')
    try {
        const orders = await orderModel.find();

        return res.status(200).send({
            success: true,
            orders
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: " error in getting all orders ",
            error,
        })
    }
}

const updateStaus = async (req, res) => {
    try {
        const { orderid, status } = req.body;
        const upadtaedOrder = await orderModel.findByIdAndUpdate(orderid, { status }, { new: true });
        if (!upadtaedOrder) {
            return res.status(404).send({ success: false, message: "Order not found" });
        }

        return res.status(200).send({ success: true, order: upadtaedOrder });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: " error in updating order status ",
            error,
        })
    }
}

module.exports = { createOrder, userOrders, allOrders, updateStaus }