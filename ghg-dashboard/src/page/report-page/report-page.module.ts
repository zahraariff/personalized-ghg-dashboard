import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportPageComponent } from './report-page.component';
import { SidebarComponent } from 'src/components/sidebar/sidebar.component';



@NgModule({
  declarations: [
    ReportPageComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ReportPageModule { }
