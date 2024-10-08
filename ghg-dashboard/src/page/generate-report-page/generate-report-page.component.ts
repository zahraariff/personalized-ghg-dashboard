import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { EmissionDataService } from 'src/services/emission-data.service';
import { PdfGeneratorService } from 'src/services/pdf-generator.service';
import { ReportDataSharingService } from 'src/services/report-data-sharing.service';

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

  constructor(private formBuilder: FormBuilder, 
    private emissionDataService: EmissionDataService, 
    private pdfGeneratorService: PdfGeneratorService,
    private router: Router,
    private reportDataSharingService: ReportDataSharingService){

      this.reportForm = this.formBuilder.group({
        name: ['', Validators.required],
        minDate: ['', Validators.required],
        maxDate: ['', Validators.required],
        scopes: this.formBuilder.group({
          scope1: [''],
          scope2: [''],
          scope3: [''],
          newscope: [''],
          scope5: ['']
        }, { validator: this.atLeastOneScopeCheckedValidator }),
        emissionDataType: this.formBuilder.group({
          fuelCombustion: [''],
          otherEmissions: [''],
          elecConsumption: [''],
          waterUsage: [''],
          waterManagement: ['']
        })
      });
      
  }

// Custom validator function
atLeastOneScopeCheckedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const scopesGroup = control as FormGroup;
  const scopeControls = Object.values(scopesGroup.controls);

  const isAtLeastOneScopeChecked = scopeControls.some((scopeControl) => scopeControl.value === true);

  return isAtLeastOneScopeChecked ? null : { atLeastOneScopeChecked: true };
};


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

    // Send Data to function that generates a report
    this.emissionDataService.submitReportData(item).subscribe(
      (response: any) => {
        this.responseData = response; // Might not need
        window.alert("You have successfully generated a report!");

        // Keep data in data sharing service to be used by next component
        this.reportDataSharingService.setReportData(response, item.name);
        this.router.navigate(['/generate-report/report']);

      },
      (error: any) => {
        console.error('An error occured: ', error);
      }
    )


  }

}
