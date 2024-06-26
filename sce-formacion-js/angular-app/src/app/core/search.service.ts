import { Inject, Injectable, Provider } from '@angular/core';
import { Filters } from 'angular-sce-commons';
import * as moment from 'moment';

import { SISPECAN_ENV } from '../app.constants';
import { environment } from '../../environments/environment';

@Injectable()
export class SearchService {
  private prefix: string;

  constructor(@Inject(SISPECAN_ENV) private sispecanEnv: string) {
    this.prefix = `${this.sispecanEnv}.${environment.nombreAplicacion}.`;
  }

  storeStatus(statusKey: string, status: Object) {
    localStorage.setItem(this.prefix + statusKey, JSON.stringify(status));
  }

  getStoredStatus(statusKey: string) {
    const status = JSON.parse(localStorage.getItem(this.prefix + statusKey));
    localStorage.removeItem(statusKey);
    return status;
  }

  transformDateFilters(filters: Filters): {} {
    const result = {};
    for (const prop in filters) {
      if (filters.hasOwnProperty(prop)) {
        result[prop] = moment(filters[prop].value, moment.ISO_8601).isValid() ? { value: new Date(filters[prop].value) } : filters[prop];
      }
    }
    return result;
  }
}

export function searchServiceFactory(sispecanEnv: string) {
  return new SearchService(sispecanEnv);
}

export function provideSearchService(): Provider {
  return {
    provide: SearchService,
    deps: [SISPECAN_ENV],
    useFactory: searchServiceFactory
  };
}
