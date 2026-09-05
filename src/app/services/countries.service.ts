import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountriesResponse } from '../models/CountriesResponse';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/countries';

  getCountries(): Observable<CountriesResponse> {
    return this.http.get<CountriesResponse>(this.apiUrl);
  }
}
