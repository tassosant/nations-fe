import {Component, OnInit} from '@angular/core';
import {Statistics} from '../../models/Statistics';
import {Region} from '../../models/Region';
import {searchForGlobalZoneless} from '@angular/cli/src/commands/mcp/tools/onpush-zoneless-migration/migrate-test-file';
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

  protected readonly searchForGlobalZoneless = searchForGlobalZoneless;
}
