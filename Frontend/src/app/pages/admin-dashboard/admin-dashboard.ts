import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { adminBookingService } from '../../services/admin';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {
  stats: any = {
    total_units: 0,
    vacant_units: 0,
    occupied_units: 0,
    total_revenue: 0,
    recent_payments: []
  };

  constructor(private adminService: adminBookingService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.adminService.getDashboardStats().subscribe({
      next: (res) => {
        this.stats = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to fetch dashboard stats', err);
      }
    });
  }
}
