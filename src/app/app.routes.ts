import { Routes } from '@angular/router';
import {App} from './app';
import {Countries} from './pages/countries/countries';
import {GdpPerformance} from './pages/gdp-performance/gdp-performance';
import {Statistics} from './pages/statistics/statistics';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path:'/home', component: App},
  { path:'/countries', component: Countries},
  { path:'/gdp-performance', component: GdpPerformance},
  { path:'/statistics', component: Statistics},
];
