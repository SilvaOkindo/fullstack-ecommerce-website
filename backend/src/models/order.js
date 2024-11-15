import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId: String,
    cartId: String,
    cartItems: [
        {
            productId: String,
            title: String,
            image: String,
            price: String,
            quantity: Number
        }
    ],
    addressInfo: 
        {
            addressID: String,
            address: String,
            city: String,
            pincode: String,
            phone: String,
            phone: String,
            notes: String
        },
    
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    orderDate: Date,
    orderUpdate: Date,
    paymentId: String,
    payerId: String
})

export const Order = mongoose.model("Order", orderSchema)