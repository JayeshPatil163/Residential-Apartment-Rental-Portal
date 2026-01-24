import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class TowerService {
    private api = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getTowers() {
        return this.http.get<any[]>(`${this.api}/towers`);
    }

    createTower(name: string) {
        return this.http.post(`${this.api}/towers`, { name });
    }
}