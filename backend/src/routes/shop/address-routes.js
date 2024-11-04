import express from 'express'
import { addAddress } from '../../controllers/shop/address-controller.js'
import { deleteAddress, editAddress, getAddresses } from '../../controllers/shop/address-controller.js'

export const addressRouter = express.Router()

addressRouter.post("/add", addAddress)
addressRouter.get("/get/:userId/", getAddresses)
addressRouter.put("/edit/:userId/:addressId", editAddress)
addressRouter.delete("/delete/:userId/:addressId", deleteAddress)