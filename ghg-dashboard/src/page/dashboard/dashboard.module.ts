import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from 'src/components/sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    ReactiveFormsModule
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
