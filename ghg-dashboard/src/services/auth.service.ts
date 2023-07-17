import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const baseUrl = 'http://localhost:3000/api/auth/login'
const logoutUrl = 'http://localhost:3000/api/auth/logout'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(usernameEmail: string, password: string): Observable<any> {
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
    return this.http.post(logoutUrl, {});
  }

  isClear(){
    let authToken = localStorage.getItem('access_token');
    console.log(authToken);
  }

}
