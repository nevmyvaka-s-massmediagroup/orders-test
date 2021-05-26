import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../types/order";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [] as Order[],
  },
  reducers: {
    change: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
  },
});

export default orderSlice;
