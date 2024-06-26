import { Component, Inject, OnInit } from '@angular/core';
import { AuthConfigService, AuthMode } from 'angular-sce-security';
import { RestartAppService, SceMenuItem, TitleService } from 'angular-sce-commons';

import { SISPECAN_ENV } from './app.constants';
import { MainMenuService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appTitle = 'Sample app';
  showHeader: boolean;
  menuItems: SceMenuItem[];

  constructor(
    private mainMenuService: MainMenuService,
    @Inject(SISPECAN_ENV) public sispecanEnv: string,
    titleService: TitleService,
    restartAppService: RestartAppService,
    private authConfigService: AuthConfigService,
  ) {}

  ngOnInit() {
    this.showHeader = ![AuthMode.darde, AuthMode.ticket].includes(this.authConfigService.getConfig().authMode as string);
    this.menuItems = this.mainMenuService.getItems();
  }
}
