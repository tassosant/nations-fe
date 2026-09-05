import {Component, OnInit, signal} from '@angular/core';
import {Statistics} from '../../models/Statistics';
import {Region} from '../../models/Region';
import {FormsModule} from '@angular/forms';
import {StatisticsService} from '../../services/statistics.service';
import {StatisticsRequest} from '../../models/StatisticsRequest';

@Component({
  imports: [
    FormsModule
  ],
  selector: 'app-statistics-page',
  styleUrl: './statistics-page.component.css',
  templateUrl: './statistics-page.component.html',
})
export class StatisticsPageComponent implements OnInit {

  regions = signal<Region[]>([]);
  statistics = signal<Statistics[]>([]);
  selectedRegionIds: number[] = [];
  yearFrom!: number | null;
  yearTo!: number | null;

  constructor(private readonly statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.statisticsService.getRegions().subscribe({
      next: (response) => {
        this.regions.set(response.regions);
      },
      error: (error) => {
        console.error('Failed to load regions', error);
      }
    });

    this.searchStatistics();
  }

  searchStatistics(): void {
    this.statisticsService.getStatistics(this.createRequest()).subscribe({
      next: (response) => {
        this.statistics.set(response.statistics);
      },
      error: (error) => {
        console.error('Failed to load statistics', error);
      }
    });
  }

  clearFilters(): void {
    this.selectedRegionIds = [];
    this.yearFrom = null;
    this.yearTo = null;
    this.searchStatistics();
  }

  private createRequest(): StatisticsRequest {
    return {
      regionIds: this.selectedRegionIds,
      yearFrom: this.yearFrom,
      yearTo: this.yearTo,
    };
  }
}
