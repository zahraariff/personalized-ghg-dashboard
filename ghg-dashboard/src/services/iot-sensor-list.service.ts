import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'https://personalized-ghg-dashboard-be.onrender.com/api/iot-sensor'

@Injectable({
  providedIn: 'root'
})
export class IotSensorListService {

  constructor(private http: HttpClient) { }

  retrieveIotList(): Observable<any> {
    return this.http.get(baseUrl);
  }
}
