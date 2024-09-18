import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../product.service';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  quantity: number = 1;

  constructor(private productService: ProductService, public cartService: CartService,public router:Router) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }
  isSidebarCollapsed = true;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  addToCart(product: Product, quantity: number) {
    this.cartService.addToCart(product, quantity);
  }

  goToCart() {
    // Navigate to cart page (assuming you have routing set up for it)
    this.router.navigate(['/cart']); 
  }
}
