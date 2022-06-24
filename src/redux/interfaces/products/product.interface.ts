export interface IReview {
    id?: string;
    userId: string
    name: string;
    rating: number;
    comment: string;
    productId: string;
}

export interface IProduct {
    id?: string;
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