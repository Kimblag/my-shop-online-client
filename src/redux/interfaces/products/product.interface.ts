export interface IReview {
    _id?: string;
    userId: string
    name: string;
    rating: number;
    comment: string;
    productId: string;
}

export interface IProduct {
    name: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    image: string;
    category: Array<string>;
    numOfReviews: number;
    reviews: IReview[];
    deleted: boolean;
}

export interface ProductDocument extends IProduct{
    _id: string;
    _v: number;
}