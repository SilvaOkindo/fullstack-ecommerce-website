import express from "express"
import { getFilteredProducts, getProductDetails } from "../../controllers/shop/product-controller.js"

export const shopRouter = express.Router()

shopRouter.get("/products", getFilteredProducts)
shopRouter.get("/products/:id", getProductDetails)