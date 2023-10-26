import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page.component';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AdminPageComponent,
    CookieService
  ],
  imports: [
    CommonModule
  ]
})
export class AdminPageModule { }
