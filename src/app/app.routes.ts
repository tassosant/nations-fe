import { Routes } from '@angular/router';
import {App} from './app';
import {CountriesPageComponent} from './pages/countries/countries-page.component';
import {GdpPerformancePageComponent} from './pages/gdp-performance/gdp-performance-page.component';
import {StatisticsPageComponent} from './pages/statistics/statistics-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path:'/home', component: App},
  { path:'/countries', component: CountriesPageComponent},
  { path:'/gdp-performance', component: GdpPerformancePageComponent},
  { path:'/statistics', component: StatisticsPageComponent},
];
