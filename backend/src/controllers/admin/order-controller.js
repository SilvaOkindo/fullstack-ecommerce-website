import { Order } from "../../models/order.js"

export const getAllOrderByUser = async (req, res) => {
    try {
  
      const orders = await Order.find()
      console.log(orders)
  
      if(!orders.length) {
        return res.status(400).json({
          success: false,
          message: "Orders not found"
        })
      }
  
      return res.status(200).json({
        success: true,
        data: orders
      })
      
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }
  
  export const getOrderDetails = async (req, res) => {
    try {
  
      const id = req.params.id
      const order = await Order.findById(id)
  
      if(!order) {
        return res.status(400).json({
          success: false,
          message: "Order not founs"
        })
      }
  
      return res.status(200).json({
        success: true,
        data: order
      })
      
      
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }