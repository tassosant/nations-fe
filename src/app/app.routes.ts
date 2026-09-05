import { Routes } from '@angular/router';
import {HomePageComponent} from './pages/home/home-page.component';
import {CountriesPageComponent} from './pages/countries/countries-page.component';
import {CountryLanguagesComponent} from './components/country-languages/country-languages.component';
import {GdpPerformancePageComponent} from './pages/gdp-performance/gdp-performance-page.component';
import {StatisticsPageComponent} from './pages/statistics/statistics-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent},
  { path: 'countries/:countryId/languages', component: CountryLanguagesComponent},
  { path: 'countries', component: CountriesPageComponent},
  { path: 'gdp-performance', component: GdpPerformancePageComponent},
  { path: 'statistics', component: StatisticsPageComponent},
];
