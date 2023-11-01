import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
});

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addProduct = createAsyncThunk('products/add', async (productData) => {
  try {
    const response = await axios.post('https://fakestoreapi.com/products', productData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteProduct = createAsyncThunk('products/delete', async (productId) => {
  try {
    await axios.delete(`https://fakestoreapi.com/products/${productId}`);
    return productId;
  } catch (error) {
    throw error;
  }
});

export const updateProduct = createAsyncThunk('products/update', async ({ productId, updatedData }) => {
  try {
    const response = await axios.put(`https://fakestoreapi.com/products/${productId}`, updatedData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.data = state.data.filter((product) => product.id !== action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const { id } = action.payload;
        const existingProductIndex = state.data.findIndex((product) => product.id === id);
        if (existingProductIndex !== -1) {
          state.data[existingProductIndex] = action.payload;
        }
      });
  },
});

export default productSlice.reducer;
