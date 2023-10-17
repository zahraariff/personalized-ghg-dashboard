import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const addUrl = 'http://localhost:3000/addEmissionData'
const listUrl = 'http://localhost:3000/view-emission-data'

@Injectable({
  providedIn: 'root'
})
export class EmissionDataService {

  constructor(private http: HttpClient) { }

  addEmissionData(data: any): Observable<any> {
    return this.http.post(addUrl, data);
  }

  retrieveEmissionDataList(){
    return this.http.get(listUrl);
  }
}
