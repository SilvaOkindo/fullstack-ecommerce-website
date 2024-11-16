import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { shopProductSlice } from "..";

const initialState = {
  isLoading: false,
  approvalUrl: null,
  orderId: null,
  orderList: [],
  orderDetails: null,
};

export const createOrder = createAsyncThunk("createOrder", async (formData) => {
  const response = await axios.post(
    "http://localhost:3000/api/v1/shop/orders",
    formData
  );

  return response.data;
});

export const capturePayment = createAsyncThunk(
  "capturePayment",
  async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/shop/orders/capture",
      { paymentId, payerId, orderId }
    );

    return response.data;
  }
);

export const getOrdersList = createAsyncThunk("ordersList", async (userId) => {
  const response = await axios.get(
    `http://localhost:3000/api/v1/shop/orders/list/${userId}`
  );

  return response.data;
});

export const getOrderDetails = createAsyncThunk("orderDetails", async (orderId) => {
  const response = await axios.get(
    `http://localhost:3000/api/v1/shop/orders/details/${orderId}`
  );

  return response.data;
});


export const orderSlice = createSlice({
  name: "shopOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalUrl = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalUrl = null;
        state.orderId = null;
      })
      .addCase(getOrdersList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data
      })
      .addCase(getOrdersList.rejected, (state) => {
        state.isLoading = false;
        state.orderList = []
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.orderDetails = action.payload.data
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null
      })
  },
});

export const {resetOrderDetails} = shopProductSlice.actions

export default orderSlice.reducer;

