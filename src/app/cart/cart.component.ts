import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../product.service';
import { CheckoutService,CheckoutModel } from '../checkout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: { product: Product, quantity: number }[] = [];
  total:any=0;
  isProcessing: boolean = false;

  constructor(private cartService: CartService,private checkoutService:CheckoutService,private router:Router) { }
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
    
    if(token==null || this.isTokenExpired(token)){
      alert("your session is expired please login again");
      
      this.router.navigate(['/login'],{replaceUrl:true});
    }
    else{
     

    this.cartItems = this.cartService.getCartItems(); // Make sure you have this method in CartService
    this.total=this.cartService.getItemCount;
    }
  }
  getTotal(): number {
    let total = 0;
  
    this.cartItems.forEach(item => {
      // Assuming item has properties price and quantity
      total += item.product.price * item.quantity;
    });
  
    return total;
  }

  checkout() {
    console.log(this.cartItems);
  
    this.isProcessing = true;
    let orderItems: CheckoutModel[] = this.cartItems.map(item => {
      return {
        productId: item.product.id,
        quantity: item.quantity
      };
    });

    this.checkoutService.completeOrder(orderItems).subscribe

    this.checkoutService.completeOrder(orderItems).subscribe({
      next: (response)  => {
        console.log('Order response:', response);
         setTimeout(() => {
          alert('Your Order is processed sucessfully');
          this.isProcessing=false;
          this.cartItems=[];
          this.cartService.clearCart();
          this.router.navigate(['/my-orders'],{replaceUrl:true})
        }, 3000);
       

        
      },
      error: (err) => {
        console.error('Error processing order:', err);
        this.isProcessing = false;
        alert('There was an error processing your order. Please try again.');
      }
    });
  
    
  }
}
