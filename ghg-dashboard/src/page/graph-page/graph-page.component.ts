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
 
}
