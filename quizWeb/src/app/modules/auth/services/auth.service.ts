import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(BASIC_URL + "api/auth/sign-up", data, { headers });
  }

  login(loginRequest: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    
    const body = {
      email: loginRequest.email,
      password: loginRequest.password
    };

    return this.http.post(BASIC_URL + "api/auth/login", body, { headers });
  }
}
