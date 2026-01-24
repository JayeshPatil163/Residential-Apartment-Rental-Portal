import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css'
})
export class NavbarComponent {
    isLoggedIn = false;
    role = 'USER';

    constructor(public auth: AuthService, private router: Router) {
        this.auth.isAuthenticated$.subscribe(status => {
            this.isLoggedIn = status;
        });
        this.auth.role$.subscribe(role => {
            this.role = role || 'USER';
        });
    }

    logout() {
        this.auth.logout();
        this.router.navigate(['/login']);
    }
}
