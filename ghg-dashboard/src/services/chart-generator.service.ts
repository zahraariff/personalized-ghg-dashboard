import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// REST API URL
const listUrl = 'http://localhost:3000/view-emission-data'


@Injectable({
  providedIn: 'root'
})
export class ChartGeneratorService {

  constructor() { }

  getEmissionDataInSpecifiedYear(year: any){
    
  }

}
