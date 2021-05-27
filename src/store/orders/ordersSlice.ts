import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../types/order";
import { RootState } from "../configureStore";
import { fetchOrders } from "../../api/orders/ordersApi";

export const fetchOrdersAsync = createAsyncThunk(
  "order/fetchOrders",
  async () => {
    const response = await fetchOrders();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [] as Order[],
    isLoading: false,
    page: 1
  },
  reducers: {
    change: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload; 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      });
  },
});


export const { change, setPage } = orderSlice.actions;

export const selectPage = (state: RootState) => state.order.page
export const orders = (state: RootState) => state.order.orders
export const isOrderLoading = (state: RootState) => state.order.isLoading

export default orderSlice.reducer;
