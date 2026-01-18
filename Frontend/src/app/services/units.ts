import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class UnitsService {
    private api = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getUnits() {
        return this.http.get(`${this.api}/units`);
    }
}