import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: { product: Product, quantity: number }[] = [];
  total:any=0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems(); // Make sure you have this method in CartService
    this.total=this.cartService.getItemCount;
  }

  checkout() {
    // Implement checkout functionality
  }
}
