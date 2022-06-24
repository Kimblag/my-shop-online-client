import { IProduct } from "../products/product.interface";

export interface CartItem extends IProduct{
    quantity: number
}

export type Cart = CartItem[]