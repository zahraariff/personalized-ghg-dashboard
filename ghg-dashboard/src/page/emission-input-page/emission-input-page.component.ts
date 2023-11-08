import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmissionDataService } from 'src/services/emission-data.service';

const baseUrl = 'http://localhost:3000/addEmissionData'

@Component({
  selector: 'app-emission-input-page',
  templateUrl: './emission-input-page.component.html',
  styleUrls: ['./emission-input-page.component.scss']
})
export class EmissionInputPageComponent {

  addForm: FormGroup;
  emissionData: any = [];
  dataID: any;
  editForm: any;
  scopeList: any = [];
  dataTypeList: any = [];
  selectedDataTypeList: any = 
  [
    {
      "name": "Fuel Combustion"
    },
    {
      "name": "Other Emissions"
    },
  ];
  dataDescList: any = [];
  selectedScope: string = '';
  selectedDataType: string = '';
  selectedDataDescList: any =
  [
    {
      "name": "Volume of petrol consumed by fleet"
    },
    {
      "name": "Volume of diesel consumed by fleet"
    },
    {
      "name": "Volume of diesel consumed by machinery/facilities"
    }
  ];


  constructor(private formBuilder: FormBuilder, private emissionDataService: EmissionDataService){
    this.addForm = this.formBuilder.group({
      scope: ['Scope 1'],
      dataType: ['Fuel Combustion'],
      dataDesc: ['Volume of petrol consumed by fleet'],
      dataValue: []
    });

    this.editForm = this.formBuilder.group({
      scope: [],
      dataType: [],
      dataDesc: [],
      dataValue: []
    });
  }

  message: boolean = false;

  ngOnInit(): void{
    var data, dataList;

    // Retrieve all Emission Data
    data = this.emissionDataService.retrieveEmissionDataList();
    dataList = data.subscribe(res => {this.emissionData = res});

    // Retrieve all Scopes for Add Form
    data = this.emissionDataService.retrieveEmissionDataScope();
    dataList = data.subscribe(res => {this.scopeList = res});

    // Retrieve All Data Types for Add Form
    data = this.emissionDataService.retrieveEmissionDataTypes();
    dataList = data.subscribe(res => {this.dataTypeList = res});

    // Retrieve All Data Description for Add Form
    data = this.emissionDataService.retrieveEmissionDataDescription();
    dataList = data.subscribe(res => {this.dataDescList = res});
  }

  show(){
    console.log(this.dataTypeList)

  }

  emSubmit(item:any){
    this.emissionDataService.addEmissionData(item)
    .subscribe(
      (response) => {
        console.log('Data sent sucessfully', response);
        this.message = true;
        setTimeout(function(){ window. location. reload(); }, 3000);
      },
      (error) => {
        console.error('Error sending data', error)
      }
    );
  }

  editData(item: any){
    const updatedItem: Record<string, any> = {};

    for (const key in item) {
      if (item.hasOwnProperty(key)&& item[key] !== null && item[key] !== '') {
        updatedItem[key] = item[key];
      }
    }
    console.log(updatedItem)
    this.emissionDataService.editEmissionData(updatedItem, this.dataID)
    .subscribe(
      (response) => {
        console.log('Data sent successfully', response);
        this.message = true;
        setTimeout(function(){ window. location. reload(); }, 3000);
      },
      (error) => {
        console.error('Error sending data', error)
      }
    );
    console.log('edit form data', item);
  }

   // Get Id of Emission Data
   editEmissionData(item: any){
    this.dataID = item;
    console.log(this.dataID)
  }

  deleteEmissionData(){
    this.emissionDataService.deleteEmissionData(this.dataID)
    .subscribe(
      (response) => {
        console.log('Data sent successfully', response);
        window.alert("Emission data deleted successfully!");
        setTimeout(function(){ window. location. reload(); }, 3000);
      },
      (error) => {
        console.error('Error sending data', error)
        window.alert("Error in deleting the Emission Data");
      }
    );
  }

  selectScope(event: Event) {
    const scopeControl = this.addForm.get('scope');
    if (scopeControl) {
      this.selectedScope = scopeControl.value;
      this.selectedDataTypeList = this.filterDataTypesBasedOnScope(this.selectedScope);
    }
  }

  selectDataType(event: Event) {
    const dataTypeControl = this.addForm.get('dataType');
    if(dataTypeControl) {
      this.selectedDataType = dataTypeControl.value;
      this.selectedDataDescList = this.filterDataDescBasedOnDataType(this.selectedDataType);
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

  filterDataDescBasedOnDataType(dataType: string): any[] {
    if(dataType === 'Fuel Combustion') {
      return this.dataDescList.filter((data: { type: string; }) => data.type === 'Fuel Combustion');
    } else if (dataType === 'Other Emissions') {
      return this.dataDescList.filter((data: { type: string; }) => data.type === 'Other Emissions');
    } else if (dataType === 'Electricity Consumption') {
      return this.dataDescList.filter((data: { type: string; }) => data.type === 'Electricity Consumption');
    } else if (dataType === 'Water Usage') {
      return this.dataDescList.filter((data: { type: string; }) => data.type === 'Water Usage');
    } else if (dataType === 'Waste Management') {
      return this.dataDescList.filter((data: { type: string; }) => data.type === 'Water Management');
    } else {
      return this.dataDescList;
    }
  }

}
