import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { TokenService } from '../services/token/token.service';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = tokenService.token;
  const role = authService.getRole();

  if (!token || role !== 'admin') {
    router.navigate(['/login']);
    return false;
  }

  const requiredRoles = route.data['requiredRoles'] as string[];

  if (
    requiredRoles &&
    requiredRoles.length > 0 &&
    !requiredRoles.includes(role!)
  ) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
