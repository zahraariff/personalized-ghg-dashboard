import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDashboardComponent } from './main-dashboard.component';
import { SidebarComponent } from 'src/components/sidebar/sidebar.component';


@NgModule({
  declarations: [
    MainDashboardComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MainDashboardModule { }
