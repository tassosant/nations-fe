import {Component, OnInit} from '@angular/core';
import {Statistics} from '../../models/Statistics';
import {Region} from '../../models/Region';
import {FormsModule} from '@angular/forms';

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

  ngOnInit(): void {

  }
}
