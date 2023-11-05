import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filterbar',
  templateUrl: './filterbar.component.html',
  styleUrls: ['./filterbar.component.scss']
})
export class FilterbarComponent {
  @Input() isChildActive: boolean | undefined;
  @Output() isChildActiveChange = new EventEmitter<boolean>();

  toggleChildClass(){
    this.isChildActive = !this.isChildActive;
    this.isChildActiveChange.emit(this.isChildActive);
  }
}
