import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'angular-sce-commons';

import { environment } from '../../environments/environment';
import { authGuard, permissionGuard } from '../app.constants';

import { CursoDetailComponent } from './curso-detail.component';
import { CursoDetailResolver } from './curso-detail.resolver';
import { CursoListComponent } from './curso-list.component';
import { CursoListResolver } from './curso-list.resolver';
import { TipoDocumentoListResolver } from '../tipodocumento/tipodocumento-list.resolver';

export const routes: Routes = [
  {
    path: 'cursos',
    canActivateChild: [authGuard, permissionGuard],
    children: [
      {
        path: '',
        component: CursoListComponent,
        data: {
          title: 'Cursos',
          permission: environment.prefijoPermisos + 'CursoList',
        },
        resolve: {
        },
      },
      {
        path: ':id',
        component: CursoDetailComponent,
        data: {
          title: 'Cursos - Detalle',
          permission: environment.prefijoPermisos + 'CursoDetail',
        },
        resolve: {
          curso: CursoDetailResolver,
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
    CursoDetailResolver,
    CursoListResolver,
  ],
})
export class CursoRoutingModule {}
