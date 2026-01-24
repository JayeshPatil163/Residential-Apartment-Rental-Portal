import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Amenity } from '../../services/amenity';

@Component({
  selector: 'app-admin-amenities',
  imports: [CommonModule, AsyncPipe, FormsModule],
  templateUrl: './admin-amenities.html',
  styleUrl: './admin-amenities.css',
})
export class AdminAmenities {
  amenities$!: Observable<any[]>;
  showPopup = false;
  newAmenityName = '';

  constructor(private amenitiesService: Amenity) { }

  ngOnInit() {
    this.amenities$ = this.amenitiesService.getAllAmenities();
  }

  addAmenity(amenityName: any) {
    if (!amenityName) {
      alert('Amenity name cannot be empty.');
      return;
    }
    this.amenitiesService.createAmenity({ name: amenityName }).subscribe({
      next: (res: any) => {
        alert('Amenity added successfully.');
        this.newAmenityName = '';
        this.showPopup = false;
        this.amenities$ = this.amenitiesService.getAllAmenities();
        window.location.reload();
      },
      error: () => {
        alert('Failed to add amenity. Please try again.');
      }
    });
  }
}
