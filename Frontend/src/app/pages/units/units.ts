import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UnitsService } from '../../services/units';
import { BookingService } from '../../services/bookings';
import { Amenity } from '../../services/amenity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterUnitsPipe } from '../../pipes/filter-units.pipe';
import { UnitSortFilterPipe } from '../../pipes/unit-sort-filter.pipe';

@Component({
  selector: 'app-units',
  imports: [CommonModule, FormsModule, FilterUnitsPipe, UnitSortFilterPipe],
  templateUrl: './units.html',
  styleUrl: './units.css',
  standalone: true,
})
export class Units implements OnInit {
  searchTerm: string = '';
  units$!: Observable<any[]>;
  availableUnits$!: Observable<any[]>;
  bookedUnits$!: Observable<any[]>;
  amenities$!: Observable<any[]>;
  platformId = inject(PLATFORM_ID);
  
  tempSortBy: string = 'rent_asc';
  tempFlatTypes: { [key: string]: boolean } = {
    '1BHK': false, '2BHK': false, '3BHK': false, '4BHK': false
  };
  tempAmenities: { [key: number]: boolean } = {};

  activeSortBy: string = 'rent_asc';
  activeFlatTypes: { [key: string]: boolean } = {
    '1BHK': false, '2BHK': false, '3BHK': false, '4BHK': false
  };
  activeAmenities: { [key: number]: boolean } = {};

  constructor(
    private unitService: UnitsService,
    private bookingService: BookingService,
    private amenityService: Amenity
  ) { }

  ngOnInit() {
    this.reloadUnits();
    this.amenities$ = this.amenityService.getAllAmenities();
  }

  applyFilters() {
    this.activeSortBy = this.tempSortBy;
    this.activeFlatTypes = { ...this.tempFlatTypes };
    this.activeAmenities = { ...this.tempAmenities };
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
