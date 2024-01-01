import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieModule } from 'ngx-cookie';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IotRegistrationPageComponent } from 'src/page/iot-registration-page/iot-registration-page.component';
import { RegisterPageComponent } from 'src/page/register-page/register-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from 'src/page/login-page/login-page.component';
import { SuccessLoginComponent } from 'src/page/success-login/success-login.component';
import { LandingPageComponent } from 'src/page/landing-page/landing-page.component';
import { MainDashboardComponent } from 'src/page/main-dashboard/main-dashboard.component';
import { SidebarComponent } from 'src/components/sidebar/sidebar.component';
import { IotSensorPageComponent } from 'src/page/iot-sensor-page/iot-sensor-page.component';
import { EditSensorModalComponent } from 'src/components/edit-sensor-modal/edit-sensor-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmissionInputPageComponent } from 'src/page/emission-input-page/emission-input-page.component';
import { EditProfilePageComponent } from 'src/page/edit-profile-page/edit-profile-page.component';
import { GraphPageComponent } from 'src/page/graph-page/graph-page.component';
import { AdminPageComponent } from 'src/page/admin-page/admin-page.component';
import { FilterbarComponent } from 'src/components/filterbar/filterbar.component';
import { GenerateReportPageComponent } from 'src/page/generate-report-page/generate-report-page.component';
import { ReportPageComponent } from 'src/page/report-page/report-page.component';
import { ManageAccountsPageComponent } from 'src/page/manage-accounts-page/manage-accounts-page.component';

@NgModule({
  declarations: [
    AppComponent,
    IotRegistrationPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    SuccessLoginComponent,
    LandingPageComponent,
    MainDashboardComponent,
    SidebarComponent,
    IotSensorPageComponent,
    EditSensorModalComponent,
    EmissionInputPageComponent,
    EditProfilePageComponent,
    GraphPageComponent,
    AdminPageComponent,
    FilterbarComponent,
    GenerateReportPageComponent,
    ReportPageComponent,
    ManageAccountsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CookieModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
