import { Component, ViewChild } from '@angular/core';
import { IotSensorListService } from 'src/services/iot-sensor-list.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IotRegistrationService } from 'src/services/iot-registration.service';

@Component({
  selector: 'app-iot-sensor-page',
  templateUrl: './iot-sensor-page.component.html',
  styleUrls: ['./iot-sensor-page.component.scss']
})

export class IotSensorPageComponent implements OnInit{
  @ViewChild('myModal') myModal: any;
  // expanded: boolean = false;
  iotSensors: any[] = [];
  modalRef: NgbModalRef | undefined;
  editForm: FormGroup;
  regForm: FormGroup;
  sensorID: any;
  

  // temp: any = [1,2,2,2,2,2,2,22,2,2,2,2,2,2,22,2,2,2,2,2,22,2,2,2,2,];

  constructor(private iotSensorListService: IotSensorListService, private modalService: NgbModal, private router: Router,
    private formBuilder: FormBuilder, private iotRegistrationService: IotRegistrationService){
      this.editForm = this.formBuilder.group({
        deviceName: [],
        deviceModel: [ ],
        desc: [],
        building: []
      });

      this.regForm = this.formBuilder.group({
        deviceName: ['', Validators.required],
        deviceModel: ['', Validators.required],
        desc: ['', Validators.required],
        building: ['', Validators.required],
        room: ['', ],
        locDesc: [''],
        deviceImage:  ['']
      });
    }

    message: boolean = false;

  ngOnInit(): void {
    var sensor, sensorList;
    sensor = this.iotSensorListService.retrieveIotList();
    sensorList = sensor.subscribe(res => {this.iotSensors = res});
    // this.iotSensor = sensorList;
  }
  
  submitData(item: any) {
    const updatedItem: Record<string, any> = {};

    for (const key in item) {
      if (item.hasOwnProperty(key)&& item[key] !== null && item[key] !== '') {
        updatedItem[key] = item[key];
      }
    }
    console.log(updatedItem)
    this.iotRegistrationService.editIotSensor(updatedItem, this.sensorID)
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

  // Get Id of Sensor
  editIot(item: any){
    this.sensorID = item;
    console.log(this.sensorID)
  }

  deleteIotSensor(){
    console.log("delete clicked")
    this.iotRegistrationService.deleteIotSensor(this.sensorID)
    .subscribe(
      (response) => {
        console.log('Data sent successfully', response);

        window.alert("IoT sensor deleting successfully!");
        setTimeout(function(){ window. location. reload(); }, 3000);

      },
      (error) => {
        console.error('Error sending data', error)
        window.alert("Error in deleting the IoT Sensor");
      }
    );
    // setTimeout(function(){ window. location. reload(); }, 3000);
  }

  submitRegData(item:any){
    this.iotRegistrationService.registerIotSensor(item)
    .subscribe(
      (response) => {
        console.log('Data sent successfully', response);
        window.alert("IoT sensor registered successfully!");
      },
      (error) => {
        console.error('Error sending data', error)
        window.alert("Error in registering the IoT Sensor");
      }
    );
    console.log(item)
  }
}
