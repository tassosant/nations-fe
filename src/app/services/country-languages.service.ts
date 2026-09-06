import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CountryLanguagesResponse} from '../models/CountryLanguagesResponse';

@Injectable({
  providedIn: 'root',
})
export class CountryLanguagesService {
  private readonly http = inject(HttpClient);
  private readonly countriesUrl = '/api/countries';

  getLanguages(countryId: number): Observable<CountryLanguagesResponse> {
    return this.http.get<CountryLanguagesResponse>(`${this.countriesUrl}/${countryId}/languages`);
  }
}
