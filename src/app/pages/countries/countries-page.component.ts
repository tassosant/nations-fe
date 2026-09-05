import {Component, OnInit} from '@angular/core';
import {Country} from '../../models/Country';

@Component({
  imports: [],
  selector: 'app-countries',
  styleUrl: './countries-page.component.css',
  templateUrl: './countries-page.component.html',
})
export class CountriesPageComponent implements OnInit{

  countries: Country[] = [];

  ngOnInit(): void {

  }


}
