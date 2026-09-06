import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RegionsResponse} from '../models/RegionsResponse';
import {StatisticsRequest} from '../models/StatisticsRequest';
import {StatisticsResponse} from '../models/StatisticsResponse';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private readonly http = inject(HttpClient);
  private readonly regionsUrl = '/api/v1/regions';
  private readonly statisticsUrl = '/api/v1/statistics';

  getRegions(): Observable<RegionsResponse> {
    return this.http.get<RegionsResponse>(this.regionsUrl);
  }

  getStatistics(request: StatisticsRequest = {page: 1, size: 10}): Observable<StatisticsResponse> {
    const {page, size, ...body} = request;
    const url = `${this.statisticsUrl}?page=${page}&size=${size}`;

    return this.http.post<StatisticsResponse>(url, body);
  }
}
