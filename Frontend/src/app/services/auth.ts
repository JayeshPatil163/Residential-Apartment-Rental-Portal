import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = environment.apiUrl;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private roleSubject = new BehaviorSubject<string | null>(localStorage.getItem('role'));
  public role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  login(data: any) {
    return this.http.post(`${this.api}/auth/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.api}/auth/register`, data);
  }

  setToken(token: string, role: string) {
    localStorage.setItem('token', token);
    this.isAuthenticatedSubject.next(true);
    localStorage.setItem('role', role);
    this.roleSubject.next(role);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  checkExpiry() {
    return this.http.get(`${this.api}/auth/check_expiry`);
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('role');
    this.roleSubject.next(null);
    this.router.navigate(['/login']);

  }

  getRole() {
    return localStorage.getItem('role');
  }

  isLoggedIn() {
    return this.isAuthenticatedSubject.value;
  }
}
