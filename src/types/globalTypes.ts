export interface IProduct {
  _id: number;
  name: string;
  image: string;
  price: number;
  features: string[];
  status: boolean;
  rating: number;
  ratingCount: number;
  quantity?: number;
}

export interface IReview {
  _id: string;
  productId: string;
  authorEmail: string;
  authorName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
