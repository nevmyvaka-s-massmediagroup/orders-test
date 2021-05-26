export interface Address {
    line1:  string
    line2: string
    city: string
    state: string
    zip: string
}

export interface Customer {
    first_name: string
    last_name: string
    address: Address
}

export interface Details {
    date: Date
}

export interface OrderDetails extends Details {
    value: number
}

export interface ShippingDetails extends Details {}

export type OrderStatus = 'open' | 'shipped' | 'cancelled'

export interface Order {
    order_number: number
    customer: Customer
    order_details: OrderDetails
    shipping_details: ShippingDetails
    status: OrderStatus
}