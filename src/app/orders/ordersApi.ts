
//mock from https://gist.githubusercontent.com/ryanjn/07512cb1c008a5ec754aea6cbbf4afab/raw/eabb4d324270cf0d3d17a79ffb00ff3cfaf9acc3/orders.json
import { Order } from "../../types/order";
import OrdersData from "./orderData.json";

// A mock function to mimic making an async request for data
export function fetchOrders() {
    return new Promise<{ data: Order[] }>((resolve) =>
      setTimeout(() => resolve({ data: OrdersData }), 500)
    );
  }