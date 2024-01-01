import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const addUrl = 'http://localhost:3000/addEmissionData'
const listUrl = 'http://localhost:3000/view-emission-data'
const editUrl = 'http://localhost:3000/edit-emission-data'
const delUrl =  'http://localhost:3000/delete-emission-data'
const viewScopeUrl = 'http://localhost:3000/view-data-scopes'
const viewDataTypesUrl = 'http://localhost:3000/view-data-types'
const viewDataDescUrl = 'http://localhost:3000/view-data-descriptions'
const addScopeUrl = 'http://localhost:3000/add-new-scope'
const addDataTypeUrl = 'http://localhost:3000/add-new-data-type'
const addDataDescUrl = 'http://localhost:3000/add-new-data-desc'
const delDataTypeUrl = 'http://localhost:3000/delete-activity-data-type'
const delScopeUrl = 'http://localhost:3000/delete-scope'
const delDataDescUrl = 'http://localhost:3000/delete-activity-data-desc'

// [CHARTS]
const generateReportData = 'http://localhost:3000/query-report-data'

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
    return this.http.patch(`${editUrl}/${item}`, data);
  }

  deleteEmissionData(item: any){
    return this.http.delete(`${delUrl}/${item}`);
  }

  // [ADMIN]: Retrieve Emission Data Scopes
  retrieveEmissionDataScope(){
    return this.http.get(viewScopeUrl);
  }

  // [ADMIN]: Retrieve Emission Data Types
  retrieveEmissionDataTypes(){
    return this.http.get(viewDataTypesUrl);
  }

  // [ADMIN]: Retrieve Emission Data Description
  retrieveEmissionDataDescription(){
    return this.http.get(viewDataDescUrl);
  }

  // [ADMIN]: Add New Emission Scope
  addNewScope(data: any): Observable<any>{
    return this.http.post(addScopeUrl, data)
  }

   // [ADMIN]: Add New Emission Activity Data Type
   addNewDataType(data: any): Observable<any>{
    return this.http.post(addDataTypeUrl, data)
  }

   // [ADMIN]: Add New Emission Activity Data Description
   addNewDataDesc(data: any): Observable<any>{
    return this.http.post(addDataDescUrl, data)
  }

   // [ADMIN]: Add New Emission Activity Data Description
   deleteScope(item: any){
    return this.http.delete(`${delScopeUrl}/${item}`);
  }

   // [ADMIN]: Add New Emission Activity Data Description
  deleteDataType(item: any){
    return this.http.delete(`${delDataTypeUrl}/${item}`);
  }

  deleteDataDesc(item: any){
    return this.http.delete(`${delDataDescUrl}/${item}`);
  }

  // [CHARTS]: Submit Generate Report Data
  submitReportData(item: any): Observable<any>{
    return this.http.post(generateReportData, item)
  }
}
