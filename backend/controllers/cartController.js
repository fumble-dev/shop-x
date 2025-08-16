import userModel from "../models/userModel";

const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;
        const user = await userModel.findById(userId)
        let cartData = await user.cartData;
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({
            success: true,
            message: "Item added to cart."
        })
    } catch (error) {
        console.error(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}

const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        const user = await userModel.findById(userId)
        let cartData = user.cartData;
        cartData[itemId][size] = quantity;

        await user.findByIdAndUpdate(userId, { cartData })

        return res.json({
            success: true,
            message: "Cart Updated."
        })
    } catch (error) {
        console.error(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
}

const getUserCart = async (req, res) => {

    try {
        const { userId } = req.body;

        const user = await userModel.findById(userId)
        let cartData = user.cartData;

        return res.json({
            success: true,
            cartData: cartData
        })
    } catch (error) {
        console.error(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

export { addToCart, updateCart, getUserCart }