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

  constructor(private formBuilder: FormBuilder, private emissionDataService: EmissionDataService){
    this.addForm = this.formBuilder.group({
      scope: ['Scope 1'],
      dataType: ['Fuel Combustion'],
      dataDesc: ['Volume of petrol consumed by fleet'],
      dataValue: []
    });
  }

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
      },
      (error) => {
        console.error('Error sending data', error)
      }
    );
  }
}
