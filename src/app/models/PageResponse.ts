import {PageInfo} from './PageInfo';

export interface PageResponse<T> extends PageInfo {
  content: T[];
}
