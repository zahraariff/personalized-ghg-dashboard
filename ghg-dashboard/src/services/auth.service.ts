import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const baseUrl = 'https://personalized-ghg-dashboard-be.onrender.com/api/auth/login'
const logoutUrl = 'https://personalized-ghg-dashboard-be.onrender.com/api/auth/logout'
const userProfileUrl = 'https://personalized-ghg-dashboard-be.onrender.com/get-user-profile'
const resetPwUrl = 'https://personalized-ghg-dashboard-be.onrender.com/reset-password'
const newPwUrl = 'https://personalized-ghg-dashboard-be.onrender.com/new-password'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private userId: any;

  constructor(private http: HttpClient) { }

  login(usernameEmail: string, password: string): Observable<any> {
    this.isAuthenticated = true;
    return this.http.post(
      baseUrl,
      {
        usernameEmail,
        password,
      },
      httpOptions
    );
  }

  logout(){
    this.isAuthenticated = false;
    return this.http.post(logoutUrl, {});
  }

  isClear(){
    let authToken = localStorage.getItem('access_token');
    console.log(authToken);
  }

  getAuthenticationStatus(): boolean {
    return this.isAuthenticated;
  }

  getUserRole(){
    
  }

  getUserId() {
    this.userId = localStorage.getItem('user_id');
    return this.userId;
  }

  getUserProfile() {

    // Call method to set the private variable user id
    this.getUserId();

    if (this.userId) {
      // Append the user ID to the URL
      const urlWithUserId = `${userProfileUrl}/${this.userId}`;

      // Make the GET request with the updated URL
      return this.http.get(urlWithUserId);
    } else {
      // Handle the case where the user ID is not available
      throw new Error('User ID not found in localStorage');
    }
  }

  requestReset(body: any): Observable<any> {
    return this.http.post(resetPwUrl, body);
  }

  newPassword(body: any): Observable<any> {
    return this.http.post(newPwUrl, body);
  }



}


