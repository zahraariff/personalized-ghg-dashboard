import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// const baseUrl = 'http://localhost:3000/api/auth/registration'
// const baseUrl = 'https://personalized-ghg-dashboard-testdeploy.vercel.app/api/auth/registration'
const baseUrl = 'https://personalized-ghg-dashboard-be.onrender.com/api/auth/registration';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  registerUser(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
}
