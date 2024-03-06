import { Component, ViewChild } from '@angular/core';
import { FilterbarComponent } from 'src/components/filterbar/filterbar.component';
import { PdfGeneratorService } from 'src/services/pdf-generator.service';
// import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';


@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.scss']
})
export class GraphPageComponent {

  showScope1: boolean = true;
  showScope2: boolean = true;
  showScope3: boolean = true;

  filterForm: FormGroup;
  isChildActive: boolean = false;
  
  selectedScopes: number[] = []; // Initially no scope filter are selected
  selectedEmissionTypes: string[] = []; // Initially no emission types filter are selected

  // Define properties to associate graphs with scopes
  graphScopes: { [key: string]: number } = {
    graph1: 0,
    graph2: 0,
    graph3: 0,
    graph4: 0,
    graph5: 1,
    graph6: 1,
    graph7: 2,
    graph8: 3
  };

  graphsToShow: string[] = ['scope1', 'scope2', 'scope3'];

//   sdk = new ChartsEmbedSDK({
//     baseUrl: "https://charts.mongodb.com/charts-project-0-mcbzq", // ~REPLACE~ with the Base URL from your Embed Chart dialog.
//   });
  
//   chart = this.sdk.createChart({
//     chartId: "6534732d-1331-48de-8bcb-5d83447f0831", // ~REPLACE~ with the Chart ID from your Embed Chart dialog.
//     height: "700px",
//     // Additional options go here
//   });

//   dashboard = this.sdk.createDashboard({
//     dashboardId: "64f89b4f-9881-4cb2-88af-4e17941a7755", // ~REPLACE~ with the Dashboard ID from your Embed Dashboard dialog.
//     height: "700px",
//     widthMode: "scale",
//     // heightMode: "fixed"
//     // Additional options go here
//  });

  constructor(private pdfGeneratorService: PdfGeneratorService, private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      scope: this.formBuilder.array([]),
      // activityDataType: this.formBuilder.array([]),
    })
  }

 isFilterBarSelected: boolean = false;

 toggleFilterBar(){
  this.isFilterBarSelected = !this.isFilterBarSelected;
 }

 toggleChildClass() {
  console.log('parent toggle child')
  this.isChildActive = !this.isChildActive;
  console.log(this.isChildActive);
 }

 filterGraphs(selectedScopes: number[]) { // this method's argument is data emitted from the child
  this.selectedScopes = selectedScopes;
}

filterEmissionDataTypes(selectedEmissionTypes: string[]) { // this method's argument is data emitted from the child
  this.selectedEmissionTypes = selectedEmissionTypes;
  }

shouldDisplayGraph(scope: number, emissionType: string): boolean {
  if (this.selectedScopes.length === 0 && this.selectedEmissionTypes.length === 0) {
    return true; // Show all graphs when no filters are selected
  }

  const scopeMatches = this.selectedScopes.length === 0 || this.selectedScopes.includes(scope);
  const typeMatches = this.selectedEmissionTypes.length === 0 || this.selectedEmissionTypes.includes(emissionType);

  return scopeMatches && typeMatches;
}

submitFilterForm(data: any){
  console.log(data);

  const graphs: string[] = [];

  // Check if 'scope' property exists in data and is an array
  if (data.scope && Array.isArray(data.scope)) {
    data.scope.forEach((value: string) => {
      if (value === '1') {
        graphs.push('scope1');
      }
      if (value === '2') {
        graphs.push('scope2');
      }  
      if (value === '3') {
        graphs.push('scope3');
      }
    });
  }

  this.graphsToShow = graphs;
  console.log(this.graphsToShow);
  this.showSelectedGraphs()

}

showSelectedGraphs() {
  // Assuming you have these boolean properties in your component
  this.showScope1 = false;
  this.showScope2 = false;
  this.showScope3 = false;

  this.graphsToShow.forEach((value: string) => {
    switch (value) {
      case 'scope1':
        this.showScope1 = true;
        break;
      case 'scope2':
        this.showScope2 = true;
        break;
      case 'scope3':
        this.showScope3 = true;
        break;
      default:
        break;
    }
  });

}
 
disableFilter() {
  this.showScope1 = true;
  this.showScope2 = true;
  this.showScope3 = true;
}

onCheckboxChange(event: Event, index: number): void{
  const formArray: FormArray = this.scope;

  if (event.target instanceof HTMLInputElement && event.target.checked) {
    console.log(event.target);
    formArray.push(this.formBuilder.control(index.toString()));
  } else {
    const indexToRemove = formArray.controls.findIndex(x => x.value === index.toString());
    formArray.removeAt(indexToRemove);
  }
}

get scope(): FormArray {
  return this.filterForm.get('scope') as FormArray;
}

}
