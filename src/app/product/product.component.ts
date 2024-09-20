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
  userLoggedIn: boolean=false;

  constructor(private productService: ProductService, public cartService: CartService,public router:Router) { }
  login(){
    this.router.navigate(['/login'],{replaceUrl:true});
  }
  logout(){
    localStorage.clear();
    this.userLoggedIn=false;
    this.router.navigate(['/login'],{replaceUrl:true});
  }
  myOrders(){
    let token=localStorage.getItem('authToken');
    if(token!=null){
      this.router.navigate(['/my-orders']);

    }
    else{
      alert('please login first to add something on your cart');
      this.router.navigate(['/login']);
    }
  }

  isTokenExpired(token: string): boolean {
    if (!token) return true;

    // Decode the token and check expiration
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = new Date(0); // The 0 here is the key, which sets the date to the epoch
    expirationDate.setUTCSeconds(payload.exp);

    // Check if the token is expired
    return expirationDate < new Date();
  }

  ngOnInit(): void {
    let token=localStorage.getItem('authToken');
    if(token!=null){
      if(this.isTokenExpired(token)){
        this.userLoggedIn=false;

      }
      else{
        this.userLoggedIn=true;
      }
      

    }
    
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }
  isSidebarCollapsed = true;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  addToCart(product: Product, quantity: number) {
    let token=localStorage.getItem('authToken');
    if(token!=null){
      this.cartService.addToCart(product, quantity);

    }
    else{
      alert('please login first to add something on your cart');
      this.router.navigate(['/login']);
    }
    
  }

  goToCart() {
    let token=localStorage.getItem('authToken');
    if(token!=null){
      console.log(this.cartService.getCartItems);

      if(this.cartService.getTotalItemsInCart()>0){
        this.router.navigate(['/cart']);
      }
      else{
        alert('Your Cart is empty now Please add some items in your cart');

      }
     

    }
    else{
      alert('please login first to add something on your cart');
      this.router.navigate(['/login']);
    }
  }
}
