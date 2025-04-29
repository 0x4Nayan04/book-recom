export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  rating: number;
  ratingsCount: number;
  buyingLinks: {
    amazon: string;
    barnesNoble: string;
    bookshop: string;
  };
  bestPrice?: {
    store: string;
    amount: number;
    currency: string;
    link: string;
  };
} 