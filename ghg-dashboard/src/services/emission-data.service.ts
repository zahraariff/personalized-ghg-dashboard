import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const addUrl = 'https://personalized-ghg-dashboard-be.onrender.com/addEmissionData'
const listUrl = 'https://personalized-ghg-dashboard-be.onrender.com/view-emission-data'
const editUrl = 'https://personalized-ghg-dashboard-be.onrender.com/edit-emission-data'
const delUrl =  'https://personalized-ghg-dashboard-be.onrender.com/delete-emission-data'
const viewScopeUrl = 'https://personalized-ghg-dashboard-be.onrender.com/view-data-scopes'
const viewDataTypesUrl = 'https://personalized-ghg-dashboard-be.onrender.com/view-data-types'
const viewDataDescUrl = 'https://personalized-ghg-dashboard-be.onrender.com/view-data-descriptions'
const addScopeUrl = 'https://personalized-ghg-dashboard-be.onrender.com/add-new-scope'
const addDataTypeUrl = 'https://personalized-ghg-dashboard-be.onrender.com/add-new-data-type'
const addDataDescUrl = 'https://personalized-ghg-dashboard-be.onrender.com/add-new-data-desc'
const delDataTypeUrl = 'https://personalized-ghg-dashboard-be.onrender.com/delete-activity-data-type'
const delScopeUrl = 'https://personalized-ghg-dashboard-be.onrender.com/delete-scope'
const delDataDescUrl = 'https://personalized-ghg-dashboard-be.onrender.com/delete-activity-data-desc'

// [CHARTS]
const generateReportData = 'https://personalized-ghg-dashboard-be.onrender.com/query-report-data'

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
