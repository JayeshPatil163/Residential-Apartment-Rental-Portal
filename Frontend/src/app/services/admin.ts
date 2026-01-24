import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class adminBookingService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllBookings(status?: string) {
    if (!status) {
      return this.http.get<any[]>(`${this.api}/admin/bookings`);
    }
    return this.http.get<any[]>(`${this.api}/admin/bookings?status=${status}`);
  }

  approveBooking(id: any, rent?: string) {
    if (!rent) {
      return this.http.post(`${this.api}/admin/bookings/${id}/approve`, {});
    }
    return this.http.post(`${this.api}/admin/bookings/${id}/approve?rent=${rent}`, {});
  }

  declineBooking(id: any, action?: string) {
    if (!action) {
      return this.http.post(`${this.api}/admin/bookings/${id}/decline`, {});
    }
    return this.http.post(`${this.api}/admin/bookings/${id}/decline?action=${action}`, {});
  }

  addAmenityToUnit(unit_id: any, amenityId: any[]) {
    return this.http.post(`${this.api}/admin/units/${unit_id}/amenities`, {
      amenity_ids: amenityId
    });
  }

  getDashboardStats() {
    return this.http.get<any>(`${this.api}/admin/dashboard-stats`);
  }
}
