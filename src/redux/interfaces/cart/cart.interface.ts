import { ProductDocument } from "../products/product.interface";

export interface CartItem extends ProductDocument{
    quantity: number
}

export type Cart = CartItem[]