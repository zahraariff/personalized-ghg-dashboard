import { Component } from '@angular/core';
import { IotRegistrationService } from 'src/services/iot-registration.service';

const baseUrl = 'http://localhost:4200/register-iot-sensor'

@Component({
  selector: 'app-iot-registration-page',
  templateUrl: './iot-registration-page.component.html',
  styleUrls: ['./iot-registration-page.component.scss']
})
export class IotRegistrationPageComponent {
  constructor(private iotRegistrationService: IotRegistrationService){}
  
  iotSubmit(item: any){
    this.iotRegistrationService.registerIotSensor(item)
    .subscribe(
      (response) => {
        console.log('Data sent successfully', response);
      },
      (error) => {
        console.error('Error sending data', error)
      }
    );
    console.log(item)
  }
}