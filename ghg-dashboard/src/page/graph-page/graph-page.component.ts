import { Component, ViewChild } from '@angular/core';
import { FilterbarComponent } from 'src/components/filterbar/filterbar.component';
import { PdfGeneratorService } from 'src/services/pdf-generator.service';
// import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";


@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.scss']
})
export class GraphPageComponent {

  filterbarComponent: FilterbarComponent;
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

  constructor(private pdfGeneratorService: PdfGeneratorService) {
    this.filterbarComponent = new FilterbarComponent();
  }

 isFilterBarSelected: boolean = false;

 toggleFilterBar(){
  this.isFilterBarSelected = !this.isFilterBarSelected;
 }

 toggleChildShowClass(child: FilterbarComponent) {
  this.filterbarComponent.toggleChildClass();
 }

 toggleChildClass() {
  console.log('parent toggle child')
  this.isChildActive = !this.isChildActive;
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
 
}
