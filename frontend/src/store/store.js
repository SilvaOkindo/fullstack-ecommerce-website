import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth_slice"
import adminProductSlice from "./admin/admin-slice"
import  shopProductSlice  from "./shop"
  
const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductSlice,
        shopProducts: shopProductSlice
    }
})

export default store