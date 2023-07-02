import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IotSensor } from 'src/app/models/iot-sensor.model';
import { catchError } from 'rxjs/operators';


const baseUrl = 'http://localhost:3000/api/post'
const editUrl = 'http://localhost:3000/api/iot/edit'
const delUrl = 'http://localhost:3000/api/iot/delete'
// const editUrl = 'http://localhost:3000/api/iot/edit/64797e279a5444d2471cb94e'

@Injectable({
  providedIn: 'root'
})
export class IotRegistrationService {

  constructor(private http: HttpClient) { }

  //Sends the data from IoT Registration Form to MongoDB
  registerIotSensor(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  editIotSensor(data: any, item: any): Observable<any> {
    console.log('service called');
    console.log(`${editUrl}/${item}`);
    // return this.http.patch(editUrl, data);
    return this.http.patch(`${editUrl}/${item}`, data);

  }

  deleteIotSensor(item:any): Observable<any> {
    console.log('delete service called')
    console.log(`${delUrl}/${item}`);
    return this.http.delete(`${delUrl}/${item}`);
  }
}
