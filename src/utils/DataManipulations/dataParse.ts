import { Order, OrderTableType } from "../../types/order";

export const getDataForOrderTable = (orders: Order[]): OrderTableType[] => {
    const newOrders: OrderTableType[] = [];
    orders.forEach((order) => {
      newOrders.push({
        orderNumber: order.order_number,
        orderDate: new Date(order.order_details.date),
        status: order.status,
        shippingDate: new Date(order.shipping_details.date),
        address: order.customer.address.line1 ?? order.customer.address.line2,
        address2: `${order.customer.address.city}, ${order.customer.address.state} ${order.customer.address.zip}`,
        value: order.order_details.value,
        currency: "USD"
      });
    });
  
    return newOrders;
  };