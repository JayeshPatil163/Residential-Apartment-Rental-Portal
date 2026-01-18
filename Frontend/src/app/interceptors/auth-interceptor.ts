import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';

const API_BASE = environment.apiUrl;

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(API_BASE)) {
    return next(req);
  }

  if (req.url.startsWith(`${API_BASE}/auth/`)) {
    return next(req);
  }

  const token = localStorage.getItem('token');

  if (!token) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
};
