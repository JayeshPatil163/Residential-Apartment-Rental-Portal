import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitSortFilter',
  standalone: true
})
export class UnitSortFilterPipe implements PipeTransform {
  transform(
    units: any[] | null,
    sortBy: string,
    flatTypes: { [key: string]: boolean },
    amenityIds: { [key: number]: boolean }
  ): any[] {
    if (!units) return [];

    const activeFlatTypes = Object.keys(flatTypes).filter(type => flatTypes[type]);
    let filtered = units;
    
    if (activeFlatTypes.length > 0) {
      filtered = filtered.filter(unit => {
        const unitBHK = unit.bedrooms + 'BHK';
        return activeFlatTypes.includes(unitBHK);
      });
    }

    const activeAmenityIds = Object.keys(amenityIds)
      .filter(id => amenityIds[Number(id)])
      .map(id => Number(id));

    if (activeAmenityIds.length > 0) {
      filtered = filtered.filter(unit => {
        if (!unit.amenities) return false;
        const unitAmenityIds = unit.amenities.map((a: any) => a.id);
        return activeAmenityIds.every(id => unitAmenityIds.includes(id));
      });
    }
    
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'rent_asc':
          return a.rent - b.rent;
        case 'rent_desc':
          return b.rent - a.rent;
        case 'availability_asc':
             return a.unit_number.localeCompare(b.unit_number, undefined, { numeric: true });
        case 'availability_desc':
             return b.unit_number.localeCompare(a.unit_number, undefined, { numeric: true });
        default:
          return 0;
      }
    });

    return filtered;
  }
}
