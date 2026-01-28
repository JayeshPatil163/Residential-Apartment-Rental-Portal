import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BookingService } from '../../services/bookings';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-my-bookings',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css',
})
export class MyBookings implements OnInit {
  approvedBookings$!: Observable<any[]>;
  historyBookings$!: Observable<any[]>;

  constructor(
    private http: HttpClient,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    const allBookings$ = this.bookingService.getBookings();

    this.approvedBookings$ = allBookings$.pipe(
      map(bookings => bookings.filter(b => b.status === 'APPROVED'))
    );

    this.historyBookings$ = allBookings$.pipe(
      map(bookings => bookings.filter(b => b.status !== 'APPROVED'))
    );
  }
}