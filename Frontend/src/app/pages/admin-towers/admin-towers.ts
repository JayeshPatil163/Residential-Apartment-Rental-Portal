import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { UnitsService } from '../../services/units';
import { TowerService } from '../../services/tower';

@Component({
    selector: 'app-admin-towers',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-towers.html',
    styleUrl: './admin-towers.css'
})
export class AdminTowers {
    towers$!: Observable<any[]>;
    selectedTowerUnits$!: Observable<any[]>;
    selectedTowerId: number | null = null;
    newTowerName: string = '';
    showPopup = false;
    selectedTowerName: string = '';

    constructor(private towerService: TowerService, private unitsService: UnitsService) {
    }

    ngOnInit() {
        this.towers$ = this.towerService.getTowers();
    }

    addTower() {
        if (!this.newTowerName.trim()) return;

        this.towerService.createTower(this.newTowerName).subscribe({
            next: () => {
                alert('Tower created successfully');
                this.newTowerName = '';
                this.showPopup = false;
                this.towers$ = this.towerService.getTowers();
                window.location.reload();
            },
            error: (err: any) => {
                alert('Failed to create tower: ' + (err.error?.message || err.message));
            }
        });
    }

    viewUnits(towerId: number, towerName: string) {
        if (this.selectedTowerId === towerId) {
            this.selectedTowerId = null;
            this.selectedTowerUnits$ = of([]);
            return;
        }
        this.selectedTowerId = towerId;
        this.selectedTowerUnits$ = this.unitsService.getUnits(towerId);
        this.selectedTowerName = towerName;
    }
}
