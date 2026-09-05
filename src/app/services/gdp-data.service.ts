import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GdpDataResponse } from '../models/GdpDataResponse';

@Injectable({
  providedIn: 'root',
})
export class GdpDataService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/gdp-data';

  getGdpData(): Observable<GdpDataResponse> {
    return this.http.get<GdpDataResponse>(this.apiUrl);
  }
}
