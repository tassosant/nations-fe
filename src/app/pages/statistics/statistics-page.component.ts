import {Component, OnInit} from '@angular/core';
import {Statistics} from '../../models/Statistics';
import {Region} from '../../models/Region';
import {FormsModule} from '@angular/forms';
import {StatisticsService} from '../../services/statistics.service';

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

  constructor(private readonly statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.statisticsService.getRegions().subscribe((response) => {
      this.regions = response.regions;
    });

    this.statisticsService.getStatistics().subscribe((response) => {
      this.statistics = response.statistics;
    });
  }
}
