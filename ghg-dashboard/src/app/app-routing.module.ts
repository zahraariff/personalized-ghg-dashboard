import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IotRegistrationPageComponent } from 'src/page/iot-registration-page/iot-registration-page.component';
import { RegisterPageComponent } from 'src/page/register-page/register-page.component';
import { SuccessRegisterPageComponent } from 'src/page/success-register-page/success-register-page.component';
import { LoginPageComponent } from 'src/page/login-page/login-page.component';
import { SuccessLoginComponent } from 'src/page/success-login/success-login.component';
import { authGuard } from 'src/services/auth.guard';
import { LandingPageComponent } from 'src/page/landing-page/landing-page.component';
import { MainDashboardComponent } from 'src/page/main-dashboard/main-dashboard.component';
import { IotSensorPageComponent } from 'src/page/iot-sensor-page/iot-sensor-page.component';
import { EmissionInputPageComponent } from 'src/page/emission-input-page/emission-input-page.component';
import { EditProfilePageComponent } from 'src/page/edit-profile-page/edit-profile-page.component';

const routes: Routes = [
  {path: 'register-iot-sensor', component: IotRegistrationPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: '',   redirectTo: '/home', pathMatch: 'full' },
  {path: 'successful-registration', component: SuccessRegisterPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'login-success', component: SuccessLoginComponent, canActivate: [authGuard]},
  {path: 'home', component: LandingPageComponent},
  {path: 'dashboard', component: MainDashboardComponent, canActivate: [authGuard]},
  {path: 'iot-sensor', component: IotSensorPageComponent, canActivate: [authGuard]},
  {path: 'emissions', component: EmissionInputPageComponent, canActivate: [authGuard]},
  {path: 'edit-profile', component: EditProfilePageComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
