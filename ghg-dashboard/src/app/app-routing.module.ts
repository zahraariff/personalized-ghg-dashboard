import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IotRegistrationPageComponent } from 'src/page/iot-registration-page/iot-registration-page.component';

const routes: Routes = [
  {path: 'register-iot-sensor', component: IotRegistrationPageComponent},
  {path: '',   redirectTo: '/register-iot-sensor', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
