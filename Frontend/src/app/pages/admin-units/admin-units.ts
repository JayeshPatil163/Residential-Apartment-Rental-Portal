import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { UnitsService } from '../../services/units';
import { adminBookingService } from '../../services/admin';
import { Amenity } from '../../services/amenity';
import { TowerService } from '../../services/tower';

@Component({
  selector: 'app-admin-units',
  imports: [CommonModule, AsyncPipe, FormsModule],
  templateUrl: './admin-units.html',
  styleUrl: './admin-units.css',
})
export class AdminUnits {
  units$!: Observable<any[]>;
  amenities$!: Observable<any[]>;
  towers$!: Observable<any[]>;
  unit_number: string = '';
  bedrooms!: number;
  rent!: number;
  selectedTowerId: number | null = null;
  amenities_ids: number[] = [];
  showPopup = false;
  selectedUnit: number | null = null;

  constructor(
    private UnitsService: UnitsService,
    private adminBookingService: adminBookingService,
    private AmenityService: Amenity,
    private TowerService: TowerService
  ) { }

  ngOnInit() {
    this.units$ = this.UnitsService.getUnits();
    this.amenities$ = this.AmenityService.getAllAmenities();
    this.towers$ = this.TowerService.getTowers();
  }

  toggleUnitId(unit: any) {
    if (this.selectedUnit === unit.id) {
      this.selectedUnit = null;
      this.amenities_ids = [];
    } else {
      this.selectedUnit = unit.id;
      if (unit.amenities) {
        for (const amenity of unit.amenities) {
          this.amenities_ids.push(amenity.id);
        }
      }
    }
  }

  isAmenitySelected(unit: any, amenityName: string): boolean {
    if (!unit.amenities) return false;
    return unit.amenities.some((a: any) => a.name === amenityName);
  }

  onAmenityToggle(amenityId: any, event: any) {
    if (event.target.checked) {
      this.amenities_ids.push(amenityId);
    } else {
      this.amenities_ids = this.amenities_ids.filter(id => id !== amenityId);
    }
  }

  updateAmenities(unit_id: any) {
    this.adminBookingService.addAmenityToUnit(unit_id, this.amenities_ids).subscribe({
      next: (res: any) => {
        alert('Amenities updated successfully.');
        this.amenities_ids = [];
        this.selectedUnit = null;
        window.location.reload();
      },
      error: () => {
        alert('Failed to update amenities. Please try again.');
      }
    });
  }

  addUnit() {
    const data: any = {
      unit_number: this.unit_number,
      bedrooms: this.bedrooms,
      rent: this.rent,
      amenities_ids: this.amenities_ids
    };

    if (this.selectedTowerId) {
      data.tower_id = this.selectedTowerId;
    }
    if (data.amenities_ids.length === 0 || data.tower_id === null || data.bedrooms === 0 || data.rent === 0 || data.unit_number === '') {
      alert('Please fill all the fields.');
      return;
    }
    this.UnitsService.createUnit(data).subscribe({
      next: (res: any) => {
        alert('Unit added successfully.');
        this.units$ = this.UnitsService.getUnits();
        this.unit_number = '';
        this.bedrooms = 0;
        this.rent = 0;
        this.selectedTowerId = null;
        this.amenities_ids = [];
        this.showPopup = false;
        window.location.reload();
      },
      error: () => {
        alert('Failed to add unit. Please try again.');
      }
    });
  }
}
