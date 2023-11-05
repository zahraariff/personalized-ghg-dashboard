import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphPageComponent } from './graph-page.component';
import { SidebarComponent } from 'src/components/sidebar/sidebar.component';
import { FilterbarComponent } from 'src/components/filterbar/filterbar.component';

@NgModule({
  declarations: [
    GraphPageComponent,
    SidebarComponent,
    FilterbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GraphPageModule { }
