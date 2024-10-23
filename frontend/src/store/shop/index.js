import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null
};

export const fetchFilteredProducts = createAsyncThunk(
  "/products/fetchFilteredProducts",
  async ({filterParams, sortParams}) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams
    })
    const result = await axios.get(
      `http://localhost:3000/api/v1/shop/products?${query}`
    );

    return result?.data;
  }
);


export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:3000/api/v1/shop/products/${id}`
    );

    return result?.data;
  }
);

export const shopProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        console.log(action.payload)
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })

      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        //console.log(action.payload)
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export default shopProductSlice.reducer