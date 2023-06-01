import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
=======
import { FormsModule } from '@angular/forms';
import { IotRegistrationPageComponent } from 'src/page/iot-registration-page/iot-registration-page.component';
>>>>>>> iot-registration-page

@NgModule({
  declarations: [
    AppComponent,
    IotRegistrationPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    HttpClientModule
=======
    FormsModule,
>>>>>>> iot-registration-page
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
