import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterbarComponent } from './filterbar.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FilterbarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class FilterbarModule { }
