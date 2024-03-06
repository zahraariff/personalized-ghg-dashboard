import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, FormArray, Form } from '@angular/forms';

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

  @Input() filterForm!: FormGroup; // Add the "!" to assert that it will be initialized (definite assignment assertion)

  constructor(private formBuilder: FormBuilder){
    this.filterForm = this.formBuilder.group({
      scope: this.formBuilder.array([]),
      // activityDataType: this.formBuilder.array([]),
    });
  }

  toggleChildClass(){
    this.isChildActive = !this.isChildActive;
    this.isChildActiveChange.emit(this.isChildActive);
  }

  applyScopesFilter(scope: number) {
    if (this.selectedScopes) {
      if (this.selectedScopes.includes(scope)) {
        // Scope is already selected, remove it
        this.selectedScopes = this.selectedScopes.filter((s) => s !== scope);
      } else {
        this.selectedScopes.push(scope);
      }
      this.filterScopes.emit(this.selectedScopes); // Emit the filtered data back to the parent
    }
  }   

  applyEmissionTypesFilter(emissionType: string) {
    if(this.selectedEmissionTypes){
      if (this.selectedEmissionTypes.includes(emissionType)) {
        this.selectedEmissionTypes = this.selectedEmissionTypes.filter((type) => type !== emissionType);
      } else {
        this.selectedEmissionTypes.push(emissionType);
      }
    }
    this.filterEmissionTypes.emit([emissionType]); // Emit the filtered data back to the parent
  }

  // isClicked(){
  //   console.log('this html element is clicked!')
  // }

  submitFilterForm(data: any){
    console.log(data);
  }

  get scope(): FormArray {
    return this.filterForm.get('scope') as FormArray;
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

}
