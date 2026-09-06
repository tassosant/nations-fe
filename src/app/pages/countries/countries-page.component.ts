import {Component, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Country} from '../../models/Country';
import {CountriesService} from '../../services/countries.service';
import {CountryLanguagesComponent} from '../../components/country-languages/country-languages.component';

@Component({
  imports: [
    CountryLanguagesComponent,
    RouterLink
  ],
  selector: 'app-countries',
  styleUrl: './countries-page.component.css',
  templateUrl: './countries-page.component.html',
})
export class CountriesPageComponent implements OnInit {

  countries = signal<Country[]>([]);

  constructor(private readonly countriesService: CountriesService) {
  }

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe({
      next: (response) => {
        this.countries.set(response.countries);
      },
      error: (error) => {
        console.error('Failed to load countries', error);
      }
    });
  }
}
