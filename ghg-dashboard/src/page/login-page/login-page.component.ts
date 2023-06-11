import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm: FormGroup;
  errorMessage: string | undefined;
  isLoggedIn = false;
  isLoginFailed = false;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router, 
    private authservice: AuthService){
    this.loginForm = this.formBuilder.group({
      usernameEmail: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitLogInData(item: any){
    const { usernameEmail, password } = item;

    const isEmail = /\S+@\S+\.\S+/.test(usernameEmail);
    const loginData = {
      [isEmail ? 'email' : 'username']: usernameEmail,
      password: password
    };

    this.loginService.login(loginData)
    .subscribe(
      (response) => {
        console.log('Data sent successfully', response);
        this.router.navigate(['/login-success']);
        console.log(this.isLoggedIn);
      },
      (error) => {
        console.error('Error sending data', error)
        this.errorMessage = error.error.error;
      }
    )
  }
}
