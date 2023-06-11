import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  
  if (loginService.isLoggedIn !== true) {
    window.alert("Access not allowed!");
    router.navigate(['login']);
  }

  return true;
};
