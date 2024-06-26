import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'angular-sce-commons';

import { environment } from '../../environments/environment';
import { authGuard, permissionGuard } from '../app.constants';

import { AlumnoDetailComponent } from './alumno-detail.component';
import { AlumnoDetailResolver } from './alumno-detail.resolver';
import { AlumnoListComponent } from './alumno-list.component';
import { AlumnoListResolver } from './alumno-list.resolver';
import { TipoDocumentoListResolver } from '../tipodocumento/tipodocumento-list.resolver';

export const routes: Routes = [
  {
    path: 'alumnos',
    canActivateChild: [authGuard, permissionGuard],
    children: [
      {
        path: '',
        component: AlumnoListComponent,
        data: {
          title: 'Alumnos',
          permission: environment.prefijoPermisos + 'AlumnoList',
        },
        resolve: {
          tiposDocumento: TipoDocumentoListResolver,
        },
      },
      {
        path: ':id',
        component: AlumnoDetailComponent,
        data: {
          title: 'Alumnos - Detalle',
          permission: environment.prefijoPermisos + 'AlumnoDetail',
        },
        resolve: {
          alumno: AlumnoDetailResolver,
          tiposDocumento: TipoDocumentoListResolver,
        },
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    AlumnoDetailResolver,
    AlumnoListResolver,
  ],
})
export class AlumnoRoutingModule {}
