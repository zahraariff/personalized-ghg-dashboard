import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IotRegistrationPageComponent } from 'src/page/iot-registration-page/iot-registration-page.component';
import { RegisterPageComponent } from 'src/page/register-page/register-page.component';
import { SuccessRegisterPageComponent } from 'src/page/success-register-page/success-register-page.component';

const routes: Routes = [
  {path: 'register-iot-sensor', component: IotRegistrationPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: '',   redirectTo: '/register', pathMatch: 'full' },
  {path: 'successful-registration', component: SuccessRegisterPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
