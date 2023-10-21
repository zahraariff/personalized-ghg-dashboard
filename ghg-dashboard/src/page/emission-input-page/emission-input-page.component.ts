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
    data = this.emissionDataService.retrieveEmissionDataList();
    dataList = data.subscribe(res => {this.emissionData = res});
  }

  emSubmit(item:any){
    console.log('submit form clicked');
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

}
