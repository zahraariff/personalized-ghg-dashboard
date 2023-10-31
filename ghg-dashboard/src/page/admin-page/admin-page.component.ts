import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EmissionDataService } from 'src/services/emission-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {

  scopeData: any = [];
  dataTypes: any = [];
  dataDesc: any = [];
  addScopeForm: FormGroup;
  editScopeForm: FormGroup;
  addActivityDataTypeForm: FormGroup;
  addActivityDataDescForm: FormGroup;
  message: boolean = false;
  dataID: any;


  constructor(private emissionDataService: EmissionDataService, private formBuilder: FormBuilder) {
    this.addScopeForm = this.formBuilder.group({
      name: []
    });

    this.editScopeForm = this.formBuilder.group({
      name: []
    });

    this.addActivityDataTypeForm = this.formBuilder.group({
      name: [],
      scope: []
    });

    this.addActivityDataDescForm = this.formBuilder.group({
      name: [],
      type: [],
      scope: []
    });

   }

  ngOnInit(): void{
    var scope, type, desc
    scope = this.emissionDataService.retrieveEmissionDataScope();
    scope.subscribe(res => {this.scopeData = res}); 
    type = this.emissionDataService.retrieveEmissionDataTypes();
    type.subscribe(res => {this.dataTypes = res}); 
    desc = this.emissionDataService.retrieveEmissionDataDescription();
    desc.subscribe(res => {this.dataDesc = res});  
  }

  addScopeFormSubmit(data:any){
    this.emissionDataService.addNewScope(data)
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

  addActivityDataTypeFormSubmit(data:any){
    this.emissionDataService.addNewDataType(data)
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

  addActivityDataDescFormSubmit(data:any){
    this.emissionDataService.addNewDataDesc(data)
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

  // Get Id 
  getId(item: any){
    this.dataID = item;
    console.log(this.dataID)
  }

  deleteScope(){
    this.emissionDataService.deleteScope(this.dataID)
    .subscribe(
      (response) => {
        console.log('Data sent successfully', response);
        window.alert("data deleted successfully!");
        setTimeout(function(){ window. location. reload(); }, 3000);
      },
      (error) => {
        console.error('Error sending data', error)
        window.alert("Error in deleting");
      }
    );
  }

  deleteDataType(){
    this.emissionDataService.deleteDataType(this.dataID)
    .subscribe(
      (response) => {
        window.alert("data deleted successfully!");
        setTimeout(function(){ window. location. reload(); }, 3000);
      },
      (error) => {
        console.error('Error sending data', error)
        window.alert("Error in deleting");
      }
    );
  }

  deleteDataDesc(){
    this.emissionDataService.deleteDataDesc(this.dataID)
    .subscribe(
      (response) => {
        window.alert("data deleted successfully!");
        setTimeout(function(){ window. location. reload(); }, 3000);
      },
      (error) => {
        console.error('Error sending data', error)
        window.alert("Error in deleting");
      }
    );
  }

}
