import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    email: string = '';
    password: string = '';

    constructor(
      private auth: AuthService,
      private router: Router
    ) {}

    login() {
      this.auth.login({
        email: this.email,
        password : this.password
      }).subscribe({
        next: (res: any) => {
          this.auth.setToken(res.access_token);
        },
        error: () => {
          alert('Login failed. Please check your credentials.');
        }
      });
    }
}
