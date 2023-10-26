import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from './cookie.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService)

  
  return true;
};
