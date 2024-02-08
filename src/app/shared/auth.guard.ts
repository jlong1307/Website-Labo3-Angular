import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService)
  let router = inject(Router)
  if(authService.isConnected)
    return true;
  router.navigate(["error"])
  return false;
};
