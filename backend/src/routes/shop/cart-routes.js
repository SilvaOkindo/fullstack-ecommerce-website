import express from "express";
import {
  addToCart,
  deleteCartItem,
  fetchCart,
  updateCartQt,
} from "../../controllers/shop/cart-controller.js";

export const cartRouter = express.Router();

cartRouter.post("/add-to-cart", addToCart);
cartRouter.get("/get/:userId", fetchCart);
cartRouter.put("/update-cart", updateCartQt);
cartRouter.delete("/:userId/:productId", deleteCartItem);
