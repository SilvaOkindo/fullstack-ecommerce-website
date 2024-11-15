import express from "express"
import { createOrder } from "../../controllers/shop/order-controller.js"

export const orderRouter = express.Router()

orderRouter.post("/", createOrder)