export interface Book {
  id?: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  rating: number;
  ratingsCount: number;
  buyingLinks: {
    amazon?: string;
    bookshop?: string;
    barnesNoble?: string;
  };
  price: {
    amount: number;
    currency: string;
  };
  bestPrice?: {
    amount: number;
    currency: string;
    store: string;
    link: string;
  };
}

export interface RecommendationResponse {
  books: Book[];
}

export type Genre = {
  id: string;
  name: string;
} 