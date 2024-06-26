import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DebugModule, SceComponentsModule } from 'angular-sce-commons';
import { SceSecurityModule } from 'angular-sce-security';

import { AppComponent } from './app.component';
import {
  BASE_PATH, basePathFactory,
  EXTERNAL_PATH, externalPathFactory,
  SISPECAN_ENV, sispecanEnvFactory,
  AUTOSERVE_PROPS, autoServePropsFactory,
} from './app.constants';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { environment } from '../environments/environment';

import { AlumnoModule } from './alumno/';
import { AlumnoCursoModule } from './alumnocurso/';
import { CursoModule } from './curso/';
import { TipoDocumentoModule } from './tipodocumento/';

@NgModule({
  imports: [
    BrowserModule,
    SceSecurityModule.forRoot(environment.securityConfig),
    SceComponentsModule.forRoot(),
    DebugModule,

    CoreModule,
    SharedModule,
    AlumnoModule,
    AlumnoCursoModule,
    CursoModule,
    TipoDocumentoModule,
    AppRoutingModule,
  ],
  declarations: [ AppComponent ],
  providers: [
    { provide: BASE_PATH, useFactory: basePathFactory },
    { provide: EXTERNAL_PATH, useFactory: externalPathFactory },
    { provide: SISPECAN_ENV, useFactory: sispecanEnvFactory },
    { provide: AUTOSERVE_PROPS, useFactory: autoServePropsFactory },
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
