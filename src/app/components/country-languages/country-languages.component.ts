import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CountriesService} from '../../services/countries.service';

@Component({
  imports: [],
  selector: 'app-languages',
  styleUrl: './country-languages.component.css',
  templateUrl: './country-languages.component.html',
})
export class CountryLanguagesComponent implements OnInit {
  private readonly countriesService = inject(CountriesService);
  private readonly route = inject(ActivatedRoute);

  country_name = signal<string>('');
  languages = signal<string[]>([]);

  ngOnInit(): void {
    const routeCountryId = this.route.snapshot.paramMap.get('countryId');

    if (routeCountryId == null) {
      return;
    }

    const countryId = Number(routeCountryId);

    if (Number.isFinite(countryId)) {
      this.loadLanguages(countryId);
    }
  }

  private loadLanguages(countryId: number): void {
    this.countriesService.getLanguages(countryId).subscribe({
      next: (response) => {
        this.country_name.set(response.country_name);
        this.languages.set(response.spoken_languages);
      },
      error: (error) => {
        console.error('Failed to load country languages', error);
      }
    });
  }
}
