import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { UnitsService } from '../../services/units';
import { BookingService } from '../../services/bookings';

@Component({
  selector: 'app-units',
  imports: [CommonModule],
  templateUrl: './units.html',
  styleUrl: './units.css',
  standalone: true,
})
export class Units {
    units: any[] = [];
    platformId = inject(PLATFORM_ID);

    constructor(
      private unitService: UnitsService,
      private bookingService: BookingService,
      private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
      this.unitService.getUnits().subscribe({
        next: (res: any) => {
            this.units = res;
            this.cdr.detectChanges();
        },
        error: () => {
          if(isPlatformBrowser(this.platformId)) {
            alert('Failed to fetch units. Please try again.');
          }
      }
    });
    }

    bookUnit(id: any) {
      this.bookingService.createBooking({ unit_id: id }).subscribe({
        next: (res: any) => {
          alert('Booking successful!');
          this.unitService.getUnits().subscribe({
            next: (res: any) => {
                this.units = res;
            }});
        },
        error: () => {
          if(isPlatformBrowser(this.platformId)) {
            alert('Failed to book unit. Please try again.');
          }
        }
      });
    }

}
