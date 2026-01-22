import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createBooking(data: any) {
    return this.http.post(`${this.api}/bookings`, data);
  }

  getBookings() {
    return this.http.get<any[]>(`${this.api}/bookings`);
  }
}
