import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { map, take } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.role$.pipe(
    take(1),
    map(role => {
      if (role === 'ADMIN') {
        return true;
      } else {
        router.navigate(['/units']);
        return false;
      }
    })
  );
};