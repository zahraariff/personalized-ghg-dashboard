import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IotSensorPageComponent } from './iot-sensor-page.component';
import { SidebarComponent } from 'src/components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IotSensorPageComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class IotSensorPageModule { }
