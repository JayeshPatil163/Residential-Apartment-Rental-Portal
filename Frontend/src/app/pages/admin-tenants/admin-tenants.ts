import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { adminBookingService } from '../../services/admin';

@Component({
  selector: 'app-admin-tenants',
  imports: [CommonModule],
  templateUrl: './admin-tenants.html',
  styleUrl: './admin-tenants.css',
})
export class AdminTenants {
    bookings$!: Observable<any[]>;

    constructor(private adminBookingService: adminBookingService) { }

    ngOnInit(): void {
        this.bookings$ = this.adminBookingService.getAllBookings("APPROVED");
    }

    collectRent(id: any) {
        this.adminBookingService.approveBooking(id, "Collecting rent").subscribe(() => {
            this.bookings$ = this.adminBookingService.getAllBookings("APPROVED");
            alert("Rent collected successfully");
            window.location.reload();
        })
    }

    terminate(id: any) {
        this.adminBookingService.declineBooking(id, "Terminating").subscribe(() => {
          this.bookings$ = this.adminBookingService.getAllBookings("APPROVED");
          alert("Tenant terminated successfully");
          window.location.reload();
        })
    }
}
