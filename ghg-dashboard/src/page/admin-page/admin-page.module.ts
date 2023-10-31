import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page.component';
import { CookieService } from 'ngx-cookie-service';
import { SidebarComponent } from 'src/components/sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminPageComponent,
    CookieService,
    SidebarComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  imports: [
    CommonModule
  ]
})
export class AdminPageModule { }
