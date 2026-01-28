import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  password: string = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
   this.auth.checkExpiry().subscribe({
    next: () => {
      if(this.auth.getRole() == 'USER'){
        this.router.navigate(['/units']);
      }
      else{
        this.router.navigate(['/admin/dashboard']);
      }
    },
    error: () => {
      this.auth.logout();
    }
   }) 
  }

  login() {
    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        this.auth.setToken(res.access_token, res.role);
        if (res.role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/units']);
        }
      },
      error: () => {
        alert('Login failed. Please check your credentials.');
      }
    });
  }
}
