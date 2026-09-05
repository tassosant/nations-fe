import {Component, OnInit} from '@angular/core';
import {GdpData} from '../../models/GdpData';

@Component({
  imports: [],
  selector: 'app-gdp-performance',
  styleUrl: './gdp-performance-page.component.css',
  templateUrl: './gdp-performance-page.component.html',
})
export class GdpPerformancePageComponent implements OnInit{

  gdpPerformances: GdpData[] = [];

  ngOnInit(): void {
  }
}
