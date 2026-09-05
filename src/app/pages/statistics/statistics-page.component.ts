import {Component, OnInit} from '@angular/core';
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
export class StatisticsPageComponent implements OnInit{

  regions:Region[] = [];
  statistics: Statistics[] = [];
  selectedRegionIds: number[]=[];
  yearFrom!: number | null;
  yearTo!: number | null;

  constructor(private readonly statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.statisticsService.getRegions().subscribe((response) => {
      this.regions = response.regions;
    });

    this.searchStatistics();
  }

  searchStatistics(): void {
    this.statisticsService.getStatistics(this.createRequest()).subscribe((response) => {
      this.statistics = response.statistics;
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
