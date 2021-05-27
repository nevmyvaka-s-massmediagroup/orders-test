import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../types/order";
import { RootState } from "../store";
import { fetchOrders } from "./ordersApi";

//mock from https://gist.githubusercontent.com/ryanjn/07512cb1c008a5ec754aea6cbbf4afab/raw/eabb4d324270cf0d3d17a79ffb00ff3cfaf9acc3/orders.json
import OrdersData from "./orderData.json";

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
    orders: OrdersData as Order[],
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
