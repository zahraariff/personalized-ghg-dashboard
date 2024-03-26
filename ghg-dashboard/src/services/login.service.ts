import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

const baseUrl = 'https://personalized-ghg-dashboard-be.onrender.com/api/auth/login'
const adminUrl = 'https://personalized-ghg-dashboard-be.onrender.com/api/auth/admin-login'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http
    .post<any>(baseUrl, data)
    .pipe(
      map((res: any) => {
        if (res.token) {
          // Decode the JWT token to get user information, including the user ID
          const decodedToken = this.decodeToken(res.token);

          // Check if the decoded token contains the user ID
          if (decodedToken && decodedToken.userId) {
            // Save the user ID in local storage
            localStorage.setItem('user_id', decodedToken.userId);
          }
        localStorage.setItem('access_token', res.token);
        return res;
        }
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
      if (res.token) {
        // Decode the JWT token to get user information, including the user ID
        const decodedToken = this.decodeToken(res.token);

        // Check if the decoded token contains the user ID
        if (decodedToken && decodedToken.userId) {
          // Save the user ID in local storage
          localStorage.setItem('user_id', decodedToken.userId);
        }
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('role', 'admin');
      return res;
      }
    }));
  }

   // Decode JWT token to extract user information
   private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}


