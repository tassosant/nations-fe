import {Component, OnInit} from '@angular/core';
import {Country} from '../../models/Country';
import {CountriesService} from '../../services/countries.service';

@Component({
  imports: [],
  selector: 'app-countries',
  styleUrl: './countries-page.component.css',
  templateUrl: './countries-page.component.html',
})
export class CountriesPageComponent implements OnInit{

  countries: Country[] = [];

  constructor(private readonly countriesService: CountriesService) {
  }

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe((response) => {
      this.countries = response.countries;
    });
  }
}
