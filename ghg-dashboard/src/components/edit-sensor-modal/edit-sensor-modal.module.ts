import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditSensorModalComponent } from './edit-sensor-modal.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditSensorModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EditSensorModalModule { }
