type productOrderType = {
    productId: string
    quantity: number
    _id: string
}

export interface OrderItem{
    _id: string
    userId: string
    products: Array<productOrderType>
    amount: number
    status: string
    createdAt: string
    updatedAt: string
    _v: number
}