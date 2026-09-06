import {Component, OnInit, signal} from '@angular/core';
import {Statistics} from '../../models/Statistics';
import {Region} from '../../models/Region';
import {FormsModule} from '@angular/forms';
import {StatisticsService} from '../../services/statistics.service';
import {StatisticsRequest} from '../../models/StatisticsRequest';
import {Pagination} from '../../components/pagination/pagination';
import {PageRequest} from '../../models/PageRequest';
import {PageInfo} from '../../models/PageInfo';

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
  pageInfo = signal<PageInfo>({
    page: 1,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });

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
    this.loadStatistics({
      page: 1,
      size: this.pageInfo().size,
    });
  }

  changePage(request: PageRequest): void {
    if (
      request.page < 1 ||
      request.size < 1 ||
      (request.page === this.pageInfo().page && request.size === this.pageInfo().size)
    ) {
      return;
    }

    this.loadStatistics(request);
  }

  private loadStatistics(pageRequest: PageRequest): void {
    this.statisticsService.getStatistics(this.createRequest(pageRequest)).subscribe({
      next: (response) => {
        this.statistics.set(response.content);
        this.pageInfo.set({
          page: pageRequest.page,
          size: pageRequest.size,
          totalElements: response.totalElements,
          totalPages: response.totalPages,
        });
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

  private createRequest(pageRequest: PageRequest): StatisticsRequest {
    return {
      page: pageRequest.page,
      size: pageRequest.size,
      regionIds: this.selectedRegionIds,
      yearFrom: this.yearFrom,
      yearTo: this.yearTo,
    };
  }
}
