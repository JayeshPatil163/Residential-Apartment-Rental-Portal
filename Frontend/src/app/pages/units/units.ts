import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UnitsService } from '../../services/units';
import { BookingService } from '../../services/bookings';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterUnitsPipe } from '../../pipes/filter-units.pipe';

@Component({
  selector: 'app-units',
  imports: [CommonModule, FormsModule, FilterUnitsPipe],
  templateUrl: './units.html',
  styleUrl: './units.css',
  standalone: true,
})
export class Units implements OnInit {
  searchTerm: string = '';
  units$!: Observable<any[]>;
  availableUnits$!: Observable<any[]>;
  bookedUnits$!: Observable<any[]>;
  platformId = inject(PLATFORM_ID);

  constructor(
    private unitService: UnitsService,
    private bookingService: BookingService,
  ) { }

  ngOnInit() {
    this.reloadUnits();
  }

  reloadUnits() {
    this.units$ = this.unitService.getUnits();
    
    this.availableUnits$ = this.units$.pipe(
      map(units => units.filter(u => u.is_available === true))
    );

    this.bookedUnits$ = this.units$.pipe(
      map(units => units.filter(u => u.is_available === false))
    );
  }

  bookUnit(id: any) {
    this.bookingService.createBooking({ unit_id: id }).subscribe({
      next: (res: any) => {
        alert('Booking successful!');
        this.reloadUnits();
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
