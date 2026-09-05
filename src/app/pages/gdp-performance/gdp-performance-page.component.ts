import {Component, OnInit, signal} from '@angular/core';
import {GdpData} from '../../models/GdpData';
import {GdpDataService} from '../../services/gdp-data.service';

@Component({
  imports: [],
  selector: 'app-gdp-performance',
  styleUrl: './gdp-performance-page.component.css',
  templateUrl: './gdp-performance-page.component.html',
})
export class GdpPerformancePageComponent implements OnInit {

  gdpPerformances = signal<GdpData[]>([]);

  constructor(private readonly gdpDataService: GdpDataService) {
  }

  ngOnInit(): void {
    this.gdpDataService.getGdpData().subscribe({
      next: (response) => {
        this.gdpPerformances.set(response.gdpData);
      },
      error: (error) => {
        console.error('Failed to load GDP data', error);
      }
    });
  }
}
