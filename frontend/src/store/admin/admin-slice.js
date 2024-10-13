import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  adminproductList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:3000/api/v1/admin/products",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(
      "http://localhost:3000/api/v1/admin/products"
    );

    return result?.data;
  }
);


export const editProduct = createAsyncThunk(
    "/products/addnewproduct",
    async ({id, formData}) => {
      const result = await axios.put(
        `http://localhost:3000/api/v1/admin/products/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return result?.data;
    }
  );


  export const deleteProduct = createAsyncThunk(
    "/products/addnewproduct",
    async (id) => {
      const result = await axios.delete(
        `http://localhost:3000/api/v1/admin/products/${id}`,
      );
  
      return result?.data;
    }
  );



const adminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder
    .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true
    }) 
    .addCase(fetchAllProducts.fulfilled, (state, action) => {
        console.log(action.payload)
        state.isLoading = false
        state.productList = action.payload.data 
    })
    .addCase(fetchAllProducts.rejected, (state, action) => {
        state.isLoading = false
        state.productList = []
    })
  },
});

export default adminProductSlice.reducer
