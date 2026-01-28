import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { adminBookingService } from '../../services/admin';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-bookings',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './admin-bookings.html',
  styleUrl: './admin-bookings.css',
})
export class AdminBookings implements OnInit {
  pendingBookings$!: Observable<any[]>;
  historyBookings$!: Observable<any[]>;

  constructor(
    private adminBookingService: adminBookingService
  ) { }

  ngOnInit() {
    this.reloadBookings();
  }

  reloadBookings() {
    const allBookings$ = this.adminBookingService.getAllBookings();
    
    this.pendingBookings$ = allBookings$.pipe(
      map(bookings => bookings.filter(b => b.status === 'PENDING'))
    );

    this.historyBookings$ = allBookings$.pipe(
      map(bookings => bookings.filter(b => b.status !== 'PENDING'))
    );
  }

  approveBooking(id: any) {
    this.adminBookingService.approveBooking(id).subscribe({
      next: (res: any) => {
        alert('Booking approved successfully.');
        this.reloadBookings();
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
        this.reloadBookings();
      },
      error: () => {
        alert('Failed to decline booking. Please try again.');
      }
    });
  }
}
