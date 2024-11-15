import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  approvalUrl: null,
  orderId: null,
};

export const createOrder = createAsyncThunk("createOrder", async (formData) => {
  const response = await axios.post(
    "http://localhost:3000/api/v1/shop/orders",
    formData
  );

  return response.data;
});

export const orderSlice = createSlice({
  name: "shopOrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.isLoading = true
    })
    .addCase(createOrder.fulfilled, (state, action) => {
      state.isLoading = false
      state.approvalUrl = action.payload.approvalUrl
      state.orderId = action.payload.orderId
    })
    .addCase(createOrder.rejected, (state) => {
      state.isLoading = false
      state.approvalUrl = null
      state.orderId = null
    })

  },
});

export default orderSlice.reducer
