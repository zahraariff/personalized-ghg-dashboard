import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmissionInputPageComponent } from './emission-input-page.component';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from 'src/components/sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmissionInputPageComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmissionInputPageModule { }
