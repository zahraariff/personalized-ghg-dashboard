import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageAccountsPageComponent } from './manage-accounts-page.component';
import { SidebarComponent } from 'src/components/sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ManageAccountsPageComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ManageAccountsPageModule { }
