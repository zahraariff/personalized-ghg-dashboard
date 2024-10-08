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

  submitAsUser(item: any){
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
        this.router.navigate(['/dashboard']);
        console.log(this.isLoggedIn);
      },
      (error) => {
        console.error('Error sending data', error)
        this.errorMessage = "Username and password does not match";
      }
    )
  }

  submitAsAdmin(item: any){
    const { usernameEmail, password, role } = item;
    const isEmail = /\S+@\S+\.\S+/.test(usernameEmail);
    const loginData = {
      [isEmail ? 'email' : 'username']: usernameEmail,
      password: password
    };

    this.loginService.loginAsAdmin(loginData)
    .subscribe(
      (response) => {
        console.log('Data sent successfully', response);
        this.router.navigate(['/admin']);
        console.log(this.isLoggedIn);
      },
      (error) => {
        console.error('Error sending data', error)
        this.errorMessage = "Invalid credentials";
      }
    )
  }
}
