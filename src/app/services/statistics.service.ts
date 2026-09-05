import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegionsResponse } from '../models/RegionsResponse';
import { StatisticsRequest } from '../models/StatisticsRequest';
import { StatisticsResponse } from '../models/StatisticsResponse';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private readonly http = inject(HttpClient);
  private readonly regionsUrl = '/regions';
  private readonly statisticsUrl = '/statistics';

  getRegions(): Observable<RegionsResponse> {
    return this.http.get<RegionsResponse>(this.regionsUrl);
  }

  getStatistics(request: StatisticsRequest = {}): Observable<StatisticsResponse> {
    return this.http.post<StatisticsResponse>(this.statisticsUrl, request);
  }
}
