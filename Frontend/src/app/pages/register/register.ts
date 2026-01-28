import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    if (this.auth.getToken()) {
      if (this.auth.getRole() == 'USER') {
        this.router.navigate(['/units']);
      }
      else {
        this.router.navigate(['/admin/units']);
      }
    }
  }

  register() {
    this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        alert('Registration successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Registration failed. Please try again.');
      }
    })
  }
}
