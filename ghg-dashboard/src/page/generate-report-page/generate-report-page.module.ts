import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateReportPageComponent } from './generate-report-page.component';
import { SidebarComponent } from 'src/components/sidebar/sidebar.component';



@NgModule({
  declarations: [
    GenerateReportPageComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GenerateReportPageModule { }
