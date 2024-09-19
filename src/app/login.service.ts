import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient) { }

  loginUser(json:any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl,json);
  }
}
export interface LoginResponse{
  token:string;
}
