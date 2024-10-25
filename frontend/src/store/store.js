import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth_slice"
import adminProductSlice from "./admin/admin-slice"
import  shopProductSlice  from "./shop"
import shopCartSlice from "./shop/cart-slice"
  
const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductSlice,
        shopProducts: shopProductSlice,
        shopCart: shopCartSlice
    }
})

export default store