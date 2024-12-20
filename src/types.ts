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
  price: {
    amount: number;
    currency: string;
  };
  bestPrice: {
    amount: number;
    currency: string;
    store: string;
    link: string;
  };
} 