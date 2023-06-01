import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IotRegistrationPageComponent } from './iot-registration-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IotRegistrationPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class IotRegistrationPageModule { }
