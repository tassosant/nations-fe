import {Component, inject, Input, OnChanges, OnInit, SimpleChanges, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CountryLanguagesService} from '../../services/country-languages.service';

@Component({
  imports: [],
  selector: 'app-languages',
  styleUrl: './country-languages.component.css',
  templateUrl: './country-languages.component.html',
})
export class CountryLanguagesComponent implements OnInit, OnChanges {
  private readonly countryLanguagesService = inject(CountryLanguagesService);
  private readonly route = inject(ActivatedRoute);

  country_name = signal<string>('');
  languages = signal<string[]>([]);
  @Input() country_id?: number;
  @Input() showTitle = false;

  ngOnInit(): void {
    const routeCountryId = this.route.snapshot.paramMap.get('countryId');

    if (routeCountryId == null || this.country_id != null) {
      return;
    }

    const countryId = Number(routeCountryId);

    if (Number.isFinite(countryId)) {
      this.showTitle = true;
      this.loadLanguages(countryId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['country_id'] || this.country_id == null) {
      return;
    }

    this.loadLanguages(this.country_id);
  }

  private loadLanguages(countryId: number): void {
    this.countryLanguagesService.getLanguages(countryId).subscribe({
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
