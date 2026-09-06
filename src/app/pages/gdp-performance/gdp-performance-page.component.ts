import {Component, OnInit, signal} from '@angular/core';
import {GdpData} from '../../models/GdpData';
import {CountriesService} from '../../services/countries.service';

@Component({
  imports: [],
  selector: 'app-gdp-performance',
  styleUrl: './gdp-performance-page.component.css',
  templateUrl: './gdp-performance-page.component.html',
})
export class GdpPerformancePageComponent implements OnInit {

  gdpPerformances = signal<GdpData[]>([]);

  constructor(private readonly countriesService: CountriesService) {
  }

  ngOnInit(): void {
    this.countriesService.getGdpData().subscribe({
      next: (response) => {
        this.gdpPerformances.set(response.gdpData);
      },
      error: (error) => {
        console.error('Failed to load GDP data', error);
      }
    });
  }
}
