import { NgModule, Optional, SkipSelf } from '@angular/core';
import {
  CalendarLocale,
  CanDeactivateGuard,
  ErrorLoggerModule,
  FilterService,
  FormService,
  QueryService,
  RestartAppService,
  RouteService,
  SelectItemService,
  TitleService,
} from 'angular-sce-commons';

import { MainMenuService } from './main-menu.service';
import { provideSearchService } from './search.service';

@NgModule({
  imports: [
    ErrorLoggerModule.forRoot(),
  ],
  providers: [
    CalendarLocale,
    CanDeactivateGuard,
    FilterService,
    FormService,
    QueryService,
    RestartAppService,
    RouteService,
    SelectItemService,
    TitleService,

    MainMenuService,
    provideSearchService(),
  ],
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
