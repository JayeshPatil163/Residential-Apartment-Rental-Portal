import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { UnitsService } from '../../services/units';
import { BookingService } from '../../services/bookings';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-units',
  imports: [CommonModule],
  templateUrl: './units.html',
  styleUrl: './units.css',
  standalone: true,
})
export class Units {
  units$!: Observable<any[]>;
  platformId = inject(PLATFORM_ID);

  constructor(
    private unitService: UnitsService,
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.units$ = this.unitService.getUnits()
  }

  bookUnit(id: any) {
    this.bookingService.createBooking({ unit_id: id }).subscribe({
      next: (res: any) => {
        alert('Booking successful!');
        this.units$ = this.unitService.getUnits();
        window.location.reload();
      },
      error: () => {
        if (isPlatformBrowser(this.platformId)) {
          alert('Failed to book unit. Please try again.');
        }
      }
    });
  }

}
