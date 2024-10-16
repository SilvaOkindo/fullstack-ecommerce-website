import { Product } from "../../models/product.js"

export const getFilteredProducts = async (req, res) => {
    try {

        const products = await Product.find({})

        return res.status(200).json({
            success: true,
            data: products
        })

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
}