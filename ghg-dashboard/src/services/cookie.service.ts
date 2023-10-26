import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  getRoleCookie(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/get-role-cookie`);
  }
}
