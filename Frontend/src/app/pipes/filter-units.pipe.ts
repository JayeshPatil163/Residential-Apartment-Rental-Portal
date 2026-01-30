import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUnits',
  standalone: true
})
export class FilterUnitsPipe implements PipeTransform {
  transform(units: any[] | null, searchTerm: string): any[] {
    if (!units) return [];
    if (!searchTerm) return units;

    const lowerTerm = searchTerm.toLowerCase();
    
    return units.filter(unit => {
      const unitNumberMatch = unit.unit_number.toString().toLowerCase().includes(lowerTerm);
      const towerNameMatch = unit.tower?.name.toLowerCase().includes(lowerTerm);
      const bedrooms = unit.bedrooms.toString().toLowerCase().includes(lowerTerm);
      const bedroomsBHK = unit.bedrooms.toString().toLowerCase() + "bhk";
      const bedroomsBHKMatch = bedroomsBHK.includes(lowerTerm.toLowerCase());
      
      return unitNumberMatch || towerNameMatch || bedrooms || bedroomsBHKMatch;
    });
  }
}
