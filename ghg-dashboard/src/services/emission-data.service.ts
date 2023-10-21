import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const addUrl = 'http://localhost:3000/addEmissionData'
const listUrl = 'http://localhost:3000/view-emission-data'
const editUrl = 'http://localhost:3000/edit-emission-data'
const delUrl =  'http://localhost:3000/delete-emission-data'

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

  editEmissionData(data: any, item: any): Observable<any>{
    console.log('edit service called')
    return this.http.patch(`${editUrl}/${item}`, data);
  }

  deleteEmissionData(item: any){
    return this.http.delete(`${delUrl}/${item}`);
  }
}
