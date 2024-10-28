import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addresses: [],
};

const addAddress = createAsyncThunk("address/addAddress", async (formData) => {
  const response = await axios.post(
    "http://localhost:3000/api/v1/address/add",
    formData
  );

  return response.data;
});

const getAddress = createAsyncThunk("address/getAddress", async (userId) => {
  const response = await axios.get(
    `http://localhost:3000/api/v1/address/get/${userId}`
  );

  return response.data;
});

const editAddress = createAsyncThunk(
  "address/editAddress",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `http://localhost:3000/api/v1/address/edit/${userId}/${addressId}`,
      formData
    );

    return response.data;
  }
);

const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `http://localhost:3000/api/v1/address/delete/${userId}/${addressId}`
    );

    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = action.payload.data;
      })
      .addCase(addAddress.rejected, (state) => {
        state.isLoading = false;
        state.addresses = [];
      })
      .addCase(getAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = action.payload.data;
      })
      .addCase(getAddress.rejected, (state) => {
        state.isLoading = false;
        state.addresses = [];
      })
      .addCase(editAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = action.payload.data;
      })
      .addCase(editAddress.rejected, (state) => {
        state.isLoading = false;
        state.addresses = [];
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = action.payload.data;
      })
      .addCase(deleteAddress.rejected, (state) => {
        state.isLoading = false;
        state.addresses = [];
      });

  },
});


export default addressSlice.reducer