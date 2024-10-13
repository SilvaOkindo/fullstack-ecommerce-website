import express from "express";
import { upload } from "../../config/cloudinary.js";
import { addProduct, deleteProduct, editProduct, fetchAllProducts, uploadImage } from "../../controllers/admin/product-controller.js";

export const productsRouter = express.Router();

productsRouter.post("/upload-image", upload.single("my_file"), uploadImage);
productsRouter.post("/products", addProduct)
productsRouter.get("/products", fetchAllProducts)
productsRouter.put("/produts:id", editProduct)
productsRouter.delete("/products/:id", deleteProduct)
