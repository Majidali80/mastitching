import { Product } from './product';

export interface CartItem extends Product {
  selectedSize: string;
  quantity: number;
} 