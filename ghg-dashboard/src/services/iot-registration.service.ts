import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IotSensor } from 'src/app/models/iot-sensor.model';

const baseUrl = 'http://localhost:3000/api/post'

@Injectable({
  providedIn: 'root'
})
export class IotRegistrationService {

  constructor(private http: HttpClient) { }

  //Sends the data from IoT Registration Form to MongoDB
  registerIotSensor(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
}
