import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js';

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;
        const image1 = req.files?.image1?.[0] || null;
        const image2 = req.files?.image2?.[0] || null;
        const image3 = req.files?.image3?.[0] || null;
        const image4 = req.files?.image4?.[0] || null;

        const images = [image1, image2, image3, image4].filter(item => item !== null);

        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url
            })
        )

        const productData = {
            name, description,
            price: Number(price),
            category, subCategory,
            bestSeller: bestSeller === 'true' ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        const product = new productModel(productData);
        await product.save();

        return res.json({
            success: true,
            message: "Product added successfully",
            product
        });


    } catch (error) {
        res.json({
            success: false,
            message: "Product listing failed."
        })
        console.error(error)
    }
}

const removeProduct = async (req, res) => {

}

const listProducts = async (req, res) => {

}

const singleProduct = async (req, res) => {

}

export { addProduct, removeProduct, listProducts, singleProduct }

