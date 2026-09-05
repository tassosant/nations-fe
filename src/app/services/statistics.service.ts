import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { RegionsResponse } from '../models/RegionsResponse';
import { StatisticsRequest } from '../models/StatisticsRequest';
import { StatisticsResponse } from '../models/StatisticsResponse';
import {environment} from '../../environments/environment';
import {Statistics} from '../models/Statistics';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private readonly http = inject(HttpClient);
  private readonly regionsUrl = '/api/regions';
  private readonly statisticsUrl = '/api/statistics';

  getRegions(): Observable<RegionsResponse> {
    return this.http.get<RegionsResponse>(this.regionsUrl);
  }

  getStatistics(request: StatisticsRequest = {}): Observable<StatisticsResponse> {
    if (environment.mockApi) {
      return this.http.get<StatisticsResponse>(this.statisticsUrl)
        .pipe(map((response) => ({
          statistics: this.filterMockStatistics(response.statistics, request),
        })));
    }

    return this.http.post<StatisticsResponse>(this.statisticsUrl, request);
  }

  private filterMockStatistics(statistics: Statistics[], request: StatisticsRequest): Statistics[] {
    const yearFrom = request.yearFrom == null ? null : Number(request.yearFrom);
    const yearTo = request.yearTo == null ? null : Number(request.yearTo);

    return statistics
      .map((statistic) => ({
        ...statistic,
        year: Number(statistic.year),
      }))
      .filter((statistic) => (
        (yearFrom == null || statistic.year >= yearFrom) &&
        (yearTo == null || statistic.year <= yearTo)
      ));
  }
}
