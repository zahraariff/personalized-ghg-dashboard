import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

const baseUrl = 'http://localhost:3000/api/auth/login'
const adminUrl = 'http://localhost:3000/api/auth/admin-login'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http
    .post<any>(baseUrl, data)
    .pipe(map((res: any) => {
      localStorage.setItem('access_token', res.token);
      return res;
    }));
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    console.log(authToken, 'this is access token');
    return authToken !== null ? true: false;
  }

  loginAsAdmin(data: any): Observable<any> {
    return this.http
    .post<any>(adminUrl, data)
    .pipe(map((res: any) => {
      localStorage.setItem('access_token', res.token);
      localStorage.setItem('role', 'admin');
      return res;
    }));
  }

}
