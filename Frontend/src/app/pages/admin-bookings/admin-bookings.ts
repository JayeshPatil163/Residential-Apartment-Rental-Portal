import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { adminBookingService } from '../../services/admin';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-bookings',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './admin-bookings.html',
  styleUrl: './admin-bookings.css',
})
export class AdminBookings {
  bookings$!: Observable<any[]>;


  constructor(
    private adminBookingService: adminBookingService
  ) { }

  ngOnInit() {
    this.bookings$ = this.adminBookingService.getAllBookings();
  }

  approveBooking(id: any) {
    this.adminBookingService.approveBooking(id).subscribe({
      next: (res: any) => {
        alert('Booking approved successfully.');
        this.bookings$ = this.adminBookingService.getAllBookings();
        window.location.reload();
      },
      error: () => {
        alert('Failed to approve booking. Please try again.');
      }
    });
  }

  declineBooking(id: any) {
    this.adminBookingService.declineBooking(id).subscribe({
      next: (res: any) => {
        alert('Booking declined successfully.');
        this.bookings$ = this.adminBookingService.getAllBookings();
        window.location.reload();
      },
      error: () => {
        alert('Failed to decline booking. Please try again.');
      }
    });
  }
}
