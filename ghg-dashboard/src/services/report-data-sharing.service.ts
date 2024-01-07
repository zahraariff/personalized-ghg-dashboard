import { Injectable } from '@angular/core';
import { AnyKeys } from 'mongoose';

@Injectable({
  providedIn: 'root'
})
export class ReportDataSharingService {
  private reportData: any;
  private reportName: any;

  constructor() { }

  setReportData(data: any, name: any) {
    this.reportData = data;
    this.reportName = name;
    console.log(data);
  }

  getReportData(): any{
    return this.reportData;
  }

  getReportName(): any {
    return this.reportName;
  }
}
