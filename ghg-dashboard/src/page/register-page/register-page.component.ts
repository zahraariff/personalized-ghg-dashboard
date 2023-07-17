import { Component } from '@angular/core';
import { RegistrationService } from 'src/services/registration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { minLengthValidator, noWhitespaceValidator, passwordStrengthValidator } from 'src/validators/custom-validators';

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
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[\w-]+(\.[\w-]+)*@um\.edu\.my$/)]],
      password: ['', [Validators.required, noWhitespaceValidator(), minLengthValidator(12), passwordStrengthValidator()]],
    });
  }
  
  submitRegistrationData(item: any){
    this.registrationService.registerUser(item)
    .subscribe(
      (response) => {
        console.log('Data sent successfully', response);
        window.alert('You have successfully registered an account! Please login to use the system.')
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
