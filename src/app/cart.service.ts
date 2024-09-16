import { Injectable } from '@angular/core';
import { Product } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: { product: Product, quantity: number }[] = [];

  addToCart(product: Product, quantity: number) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
  }

  getItemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  getCartItems() {
    return this.cartItems;
  }

  // Optionally, you can add methods to clear the cart, etc.
}
