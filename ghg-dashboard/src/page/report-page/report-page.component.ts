import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js'
import { ReportDataSharingService } from 'src/services/report-data-sharing.service';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss']
})
export class ReportPageComponent {

  reportData: any;
  chart: any;
  apiLabels = ['Label1', 'Label2', 'Label3', 'Label4', 'Label5', 'Label6', 'Label7'];  // Modify this to adapt to data from API that's consumed
  dataValue: any = [];
  @ViewChild('canvas', { static: true }) canvas!: ElementRef;
  reportName: any;

  constructor( private service: ReportDataSharingService, private cdr: ChangeDetectorRef){
    Chart.register(...registerables);
  }

  ngOnInit() {
    // get response from data 
    this.reportData = this.service.getReportData();
    console.log('data', this.reportData);
    this.reportName = this.service.getReportName();
    console.log('name', this.reportName)

    // Create a map to store aggregated data by month
    const aggregatedDataByMonth = new Map();

    // Helper function to get the numerical month value
    const getMonthValue = (monthName: string) => {
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return months.indexOf(monthName);
    };

    // Populate the bar chart data
    this.reportData.forEach((item: any) => {
      const date = new Date(item.createdAt);
      const month = date.toLocaleString('en-US', { month: 'long' });
    
      // Check if the month exists in the map
      if (aggregatedDataByMonth.has(month)) {
        // If it exists, update the aggregated value
        const existingData = aggregatedDataByMonth.get(month);
        existingData.dataValue += item.dataValue;
      } else {
        // If it doesn't exist, add a new entry to the map
        aggregatedDataByMonth.set(month, { dataValue: item.dataValue });
      }
    });

      // Extract months and aggregated values from the map
      this.apiLabels = Array.from(aggregatedDataByMonth.keys()).sort((a, b) => {
        return getMonthValue(a) - getMonthValue(b);
      });
      this.dataValue = Array.from(aggregatedDataByMonth.values()).map(entry => entry.dataValue);

  }

  ngAfterViewInit() {
    this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), {
      type: 'bar',
      data: {
        labels: this.apiLabels, // Modify this to adapt to data from API that's consumed
        datasets: [{
          label: this.reportName,
          data: this.dataValue,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });

}

}
