import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

const API_BASE = environment.apiUrl;

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  if (!req.url.startsWith(API_BASE)) {
    return next(req);
  }

  if (req.url.startsWith(`${API_BASE}/auth/`)) {
    return next(req);
  }

  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.clear(); 
        router.navigate(['/login']); 
      }
      return throwError(() => error);
    })
  );
};
