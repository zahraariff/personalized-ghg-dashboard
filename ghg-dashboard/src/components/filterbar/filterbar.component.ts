import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filterbar',
  templateUrl: './filterbar.component.html',
  styleUrls: ['./filterbar.component.scss']
})
export class FilterbarComponent {
  // Variables to toggle the filterbar in the parent
  @Input() isChildActive: boolean | undefined;
  @Output() isChildActiveChange = new EventEmitter<boolean>();

  // Variables to filter the graphs
  @Input() selectedScopes: number[] | undefined; // Data from the parent component
  @Input() selectedEmissionTypes: string[] | undefined; // Data from the parent component
  @Output() filterScopes = new EventEmitter<number[]>();
  @Output() filterEmissionTypes = new EventEmitter<string[]>();

  toggleChildClass(){
    this.isChildActive = !this.isChildActive;
    this.isChildActiveChange.emit(this.isChildActive);
  }

   applyScopesFilter(scope: number) {
    console.log('method clicked')
    if(this.selectedScopes) {
      if (this.selectedScopes.includes(scope)) {
        this.selectedScopes = this.selectedScopes.filter((s) => s !== scope);
      } else {
        this.selectedScopes.push(scope);
      }
      this.filterScopes.emit([scope]); // Emit the filtered data back to the parent
   
    }
    
  }

  applyEmissionTypesFilter(emissionType: string) {
    console.log('method clicked')
    if(this.selectedEmissionTypes){
      if (this.selectedEmissionTypes.includes(emissionType)) {
        this.selectedEmissionTypes = this.selectedEmissionTypes.filter((type) => type !== emissionType);
      } else {
        this.selectedEmissionTypes.push(emissionType);
      }
    }
    this.filterEmissionTypes.emit([emissionType]); // Emit the filtered data back to the parent
  }

}
