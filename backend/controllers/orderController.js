import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {
    try {
        const { userId, amount, address, items } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {
            cartData: {}
        })

        res.json({
            success: true,
            message: 'Order Placed.'
        })

    } catch (error) {
        console.error(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}

const placeOrderRazorpay = async (req, res) => {

}

const allOrders = async (req, res) => {

}

const userOrders = async (req, res) => {

}

const updateStatus = async (req, res) => {

}

export { placeOrder, placeOrderRazorpay, allOrders, updateStatus, userOrders }