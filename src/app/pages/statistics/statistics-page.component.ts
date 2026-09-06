import {Component, OnInit, signal} from '@angular/core';
import {Statistics} from '../../models/Statistics';
import {Region} from '../../models/Region';
import {FormsModule} from '@angular/forms';
import {StatisticsService} from '../../services/statistics.service';
import {StatisticsRequest} from '../../models/StatisticsRequest';
import {Pagination} from '../../components/pagination/pagination';

@Component({
  imports: [
    FormsModule,
    Pagination
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
  page = 0;
  pageSize = 10;
  totalElements = signal(0);
  totalPages = signal(0);

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
    this.page = 0;
    this.loadStatistics();
  }

  changePage(page: number): void {
    if (page < 0 || page >= this.totalPages() || page === this.page) {
      return;
    }

    this.page = page;
    this.loadStatistics();
  }

  private loadStatistics(): void {
    this.statisticsService.getStatistics(this.createRequest()).subscribe({
      next: (response) => {
        this.statistics.set(response.content);
        this.page = response.page;
        this.pageSize = response.size;
        this.totalElements.set(response.totalElements);
        this.totalPages.set(response.totalPages);
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
      page: this.page,
      size: this.pageSize,
      regionIds: this.selectedRegionIds,
      yearFrom: this.yearFrom,
      yearTo: this.yearTo,
    };
  }
}
