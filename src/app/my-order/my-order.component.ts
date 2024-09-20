import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent {

  orders: any[] = [];

  constructor(private http: HttpClient,private routes:Router) {}

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
        
        this.routes.navigate(['/login'],{replaceUrl:true});
      }
      else{
        this.fetchOrders();
      }

      
    
    
  }

  fetchOrders(): void {
    let token= localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.get<any[]>('http://localhost:8080/orders',{headers}).subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (error) => {
        console.error('Error fetching orders', error);
      }
    });
  }
}
