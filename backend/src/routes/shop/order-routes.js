import express from "express"
import { capturOrder, createOrder, getAllOrderByUser, getOrderDetails } from "../../controllers/shop/order-controller.js"

export const orderRouter = express.Router()

orderRouter.post("/", createOrder)
orderRouter.post("/capture", capturOrder)
orderRouter.get("/list/:userId", getAllOrderByUser)
orderRouter.get("/details/:id", getOrderDetails)