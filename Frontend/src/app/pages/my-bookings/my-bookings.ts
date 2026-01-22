import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BookingService } from '../../services/bookings';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-bookings',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css',
})
export class MyBookings {
  bookings$!: Observable<any[]>;

  constructor(
    private http: HttpClient,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.bookings$ = this.bookingService.getBookings();
  }
}