import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-emission-input-page',
  templateUrl: './emission-input-page.component.html',
  styleUrls: ['./emission-input-page.component.scss']
})
export class EmissionInputPageComponent {

  addForm: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.addForm = this.formBuilder.group({
      scope: ['Scope 1'],
      dataType: ['Fuel Combustion'],
      dataDesc: ['Volume of petrol consumed by fleet'],
      dataValue: []
    });
  }

  emSubmit(item:any){
    console.log('submit form clicked');
  }
}
