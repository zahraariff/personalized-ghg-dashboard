import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfilePageComponent } from './edit-profile-page.component';
import { SidebarComponent } from 'src/components/sidebar/sidebar.component';



@NgModule({
  declarations: [
    EditProfilePageComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EditProfilePageModule { }
