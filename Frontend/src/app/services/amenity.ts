import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Amenity {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllAmenities() {
    return this.http.get<any[]>(`${this.api}/amenities`);
  }

  createAmenity(data: any) {
    return this.http.post(`${this.api}/amenities`, data);
  }
}
