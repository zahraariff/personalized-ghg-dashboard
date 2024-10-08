import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDashboardComponent } from './main-dashboard.component';
import { SidebarComponent } from 'src/components/sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainDashboardComponent,
    SidebarComponent,
    ReactiveFormsModule
  ],
  imports: [
    CommonModule
  ]
})
export class MainDashboardModule { }
