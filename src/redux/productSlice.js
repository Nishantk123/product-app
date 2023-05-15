import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("products/fetchProductss", async () => {
  const response = await fetch("https://fakestoreapi.com/products?limit=5");
  const Product = await response.json();
  return Product;
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    product_list: [],
    loading: false,
  },
  reducers: {
    productAdded(state, action) {
      state.product_list.push(action.payload);
    },
    productUpdated(state, action) {
      const { id, title, description } = action.payload;
      const existingProduct = state.product_list.find((product) => product.id === id);
      if (existingProduct) {
        existingProduct.title = title;
        existingProduct.description = description;
      }
    },
    productDeleted(state, action) {
      const { id } = action.payload;
      const existingProduct = state.product_list.find((product) => product.id === id);
      if (existingProduct) {
        state.product_list = state.product_list.filter((product) => product.id !== id);
      }
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.product_list = [...state.product_list, ...action.payload];
    },
    [fetchProducts.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { productAdded, productUpdated, productDeleted } = productsSlice.actions;

export default productsSlice.reducer;