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
  private nameSubject = new BehaviorSubject<string | null>(localStorage.getItem('user_name'));
  public name$ = this.nameSubject.asObservable();
  private emailSubject = new BehaviorSubject<string | null>(localStorage.getItem('user_email'));
  public email$ = this.emailSubject.asObservable();

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

  setToken(token: string, role: string, name: string, email: string) {
    localStorage.setItem('token', token);
    this.isAuthenticatedSubject.next(true);
    localStorage.setItem('role', role);
    this.roleSubject.next(role);
    
    if (name) {
        localStorage.setItem('user_name', name);
        this.nameSubject.next(name);
    }
    if (email) {
        localStorage.setItem('user_email', email);
        this.emailSubject.next(email);
    }
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
    localStorage.removeItem('user_name');
    this.nameSubject.next(null);
    localStorage.removeItem('user_email');
    this.emailSubject.next(null);
    this.router.navigate(['/login']);

  }

  getRole() {
    return localStorage.getItem('role');
  }

  isLoggedIn() {
    return this.isAuthenticatedSubject.value;
  }
}
