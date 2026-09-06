import {PageRequest} from './PageRequest';

export interface StatisticsRequest extends PageRequest {
  regionIds?:number[];
  yearFrom?:number | null;
  yearTo?:number | null;
}
