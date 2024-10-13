import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth_slice"
import adminProductSlice from "./admin/admin-slice"
  
const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductSlice
    }
})

export default store