import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountriesResponse } from '../models/CountriesResponse';
import {CountryLanguagesResponse} from '../models/CountryLanguagesResponse';
import {GdpDataResponse} from '../models/GdpDataResponse';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private readonly http = inject(HttpClient);
  private readonly countriesUrl = '/api/countries';

  getCountries(): Observable<CountriesResponse> {
    return this.http.get<CountriesResponse>(this.countriesUrl);
  }

  getLanguages(countryId: number): Observable<CountryLanguagesResponse> {
    return this.http.get<CountryLanguagesResponse>(`${this.countriesUrl}/${countryId}/languages`);
  }

  getGdpData(): Observable<GdpDataResponse> {
    return this.http.get<GdpDataResponse>(`${this.countriesUrl}/gdp-data`);
  }
}
