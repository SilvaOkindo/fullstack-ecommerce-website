import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth_slice"
import adminProductSlice from "./admin/admin-slice"
import  shopProductSlice  from "./shop"
import shopCartSlice from "./shop/cart-slice"
import addressSlice from './shop/address-slice/index.js'
import orderSlice  from "./shop/order-slice"
  
const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductSlice,
        shopProducts: shopProductSlice,
        shopCart: shopCartSlice,
        shopAddress: addressSlice,
        shopOrder: orderSlice
    }
})

export default store