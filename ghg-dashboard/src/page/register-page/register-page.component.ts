import { Component } from '@angular/core';
import { RegistrationService } from 'src/services/registration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  regForm: FormGroup;
  errorMessage: string | undefined;

  constructor(private registrationService: RegistrationService, private formBuilder: FormBuilder, private router: Router){
    this.regForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  
  submitRegistrationData(item: any){
    this.registrationService.registerUser(item)
    .subscribe(
      (response) => {
        console.log('Data sent successfully', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error sending data', error)
        this.errorMessage = error.error.error;
      }
    );
    console.log(item)
  }
}
