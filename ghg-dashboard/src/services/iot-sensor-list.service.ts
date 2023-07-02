import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/api/iot-sensor'

@Injectable({
  providedIn: 'root'
})
export class IotSensorListService {

  constructor(private http: HttpClient) { }

  retrieveIotList(): Observable<any> {
    return this.http.get(baseUrl);
  }
}
