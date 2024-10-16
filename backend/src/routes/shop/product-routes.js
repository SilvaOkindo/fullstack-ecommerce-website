import express from "express"
import { getFilteredProducts } from "../../controllers/shop/product-controller.js"

export const shopRouter = express.Router()

shopRouter.get("/products", getFilteredProducts)