import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class adminBookingService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllBookings() {
    return this.http.get<any[]>(`${this.api}/admin/bookings`);
  }

  approveBooking(id: any) {
    return this.http.post(`${this.api}/admin/bookings/${id}/approve`, {});
  }

  addAmenityToUnit(unitId: any, amenityId: any[]) {
    return this.http.post(`${this.api}/units/${unitId}/amenities`, {
      amenity_id: amenityId
    });
  }
}
