import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() && authService.getUserType() === 'merchant') {
    // If the user is logged in, return true to allow the route activation
    return true;
  } else {
    // If the user is not logged in, redirect them to the login page
    router.navigate(['/Merchants']); // Replace '/login' with your actual login route
    return false;
  }
};