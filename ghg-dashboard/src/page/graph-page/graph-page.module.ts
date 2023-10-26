import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphPageComponent } from './graph-page.component';
import { SidebarComponent } from 'src/components/sidebar/sidebar.component';


@NgModule({
  declarations: [
    GraphPageComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GraphPageModule { }
