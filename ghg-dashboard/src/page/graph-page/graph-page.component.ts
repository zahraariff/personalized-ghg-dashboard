import { Component, ViewChild } from '@angular/core';
import { FilterbarComponent } from 'src/components/filterbar/filterbar.component';

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

  constructor() {
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
