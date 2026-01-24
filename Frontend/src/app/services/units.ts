import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class UnitsService {
    private api = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getUnits(towerId?: number) {
        let url = `${this.api}/units`;
        if (towerId) {
            url += `?tower_id=${towerId}`;
        }
        return this.http.get<any[]>(url);
    }

    createUnit(data: any) {
        return this.http.post(`${this.api}/units`, data);
    }
}