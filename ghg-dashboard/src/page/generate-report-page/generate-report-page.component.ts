import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { subscribeOn } from 'rxjs';
import { EmissionDataService } from 'src/services/emission-data.service';
import { PdfGeneratorService } from 'src/services/pdf-generator.service';

@Component({
  selector: 'app-generate-report-page',
  templateUrl: './generate-report-page.component.html',
  styleUrls: ['./generate-report-page.component.scss']
})
export class GenerateReportPageComponent {

  reportForm: FormGroup;
  scopeList: any = [];
  selectedScopeList: any = [];
  dataTypeList: any = [];
  selectedDataTypeList: any = [];
  selectedScope: string = '';
  selectedDataType: string = '';
  responseData: any; 

  constructor(private formBuilder: FormBuilder, private emissionDataService: EmissionDataService, private pdfGeneratorService: PdfGeneratorService){
    this.reportForm = this.formBuilder.group({
      name: [],
      minDate: [],
      maxDate: [],
      scopes: this.formBuilder.group({
        scope1: [''],
        scope2: [''],
        scope3: [''],
        newscope: [''],
        scope5: ['']
      }),
      emissionDataType: this.formBuilder.group({
        fuelCombustion: [''],
        otherEmissions: [''],
        elecConsumption: [''],
        waterUsage: [''],
        waterManagement: ['']
      })
    });
  }

  ngOnInit(): void {
    var data, dataList;

    // Retrieve all scopes
    data = this.emissionDataService.retrieveEmissionDataScope();
    dataList = data.subscribe(res => {this.scopeList = res});

    // Retrieve all emission data types 
    data = this.emissionDataService.retrieveEmissionDataTypes();
    dataList = data.subscribe(res => {this.dataTypeList = res});

  }


  selectScope(event: Event) {
    const scopeControl = this.reportForm.get('scope');
    if (scopeControl) {
      this.selectedScope = scopeControl.value;
      this.selectedDataTypeList = this.filterDataTypesBasedOnScope(this.selectedScope);
    }
  }

  filterDataTypesBasedOnScope(scope: string): any[] {
    if (scope === 'Scope 1') {
      return this.dataTypeList.filter((data: { scope: string; }) => data.scope === 'Scope 1');
    } else if (scope === 'Scope 2') {
      return this.dataTypeList.filter((data: { scope: string; }) => data.scope === 'Scope 2');
    } else if (scope === 'Scope 3') {
      return this.dataTypeList.filter((data: { scope: string; }) => data.scope === 'Scope 3');
    } else {
      return this.dataTypeList;     
    }
  }

  submitReportForm(item: any){
    // console.log(item)

    // Send Data to function that generates a report
    this.emissionDataService.submitReportData(item).subscribe(
      (response: any) => {
        this.responseData = response; 
        window.alert("You have successfully generated a report!");
      },
      (error: any) => {
        console.error('An error occured: ', error);
      }
    );



  }

  // async generateReport(){
  //   // Generate Pdf that contains all the scope specified
    
  //   const pdfBytes = await this.pdfGeneratorService.generatePdfWithIframe();

  //   // Create a Blob from the PDF data
  //   const blob = new Blob([pdfBytes], { type: 'application/pdf' });

  //   // Create a download link and trigger a click to download the PDF
  //   const link = document.createElement('a');
  //   link.href = window.URL.createObjectURL(blob);
  //   link.download = 'generated-pdf.pdf';
  //   link.click();
  // }

  async generateReport(form: FormGroup){
    const title = form.get('name')!.value;
    console.log(title);
    if(title){
      try {
        const pdfBytes = await this.pdfGeneratorService.generatePdf(title);
        // For demonstration, let's display the PDF in a new window
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    }
  }


}
