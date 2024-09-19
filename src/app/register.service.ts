import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:8080/auth/register';

  constructor(private http: HttpClient) { }

  registerUser(json:any): Observable<string> {
    return this.http.post<string>(this.apiUrl,json);
  }
}
