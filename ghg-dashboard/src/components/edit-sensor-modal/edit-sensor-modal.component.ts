import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-sensor-modal',
  templateUrl: './edit-sensor-modal.component.html',
  styleUrls: ['./edit-sensor-modal.component.scss']
})
export class EditSensorModalComponent {
  editIotSensorForm: FormGroup;
  errorMessage: string | undefined;
  
  constructor( private formBuilder: FormBuilder){
    this.editIotSensorForm = this.formBuilder.group({
      deviceName: [''],
      deviceModel: [''],
      desc: [''],
      building: ['']
    })
  }

  submitIotSensorForm(item:any){
    console.log(item, 'form data');
  }
}
