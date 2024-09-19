import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

 
  

  private apiUrl = 'http://localhost:8080/orders';

  constructor(private http: HttpClient) { }


  completeOrder(json:CheckoutModel[]): Observable<any> {
   let token= localStorage.getItem('authToken');
   const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
    return this.http.post<any>(this.apiUrl,json,{headers});
  }


}

export interface CheckoutModel{
  productId:number;
  quantity:number;
}
