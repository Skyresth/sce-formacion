import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'angular-sce-commons';

import { environment } from '../../environments/environment';
import { authGuard, permissionGuard } from '../app.constants';

import { TipoDocumentoDetailComponent } from './tipodocumento-detail.component';
import { TipoDocumentoDetailResolver } from './tipodocumento-detail.resolver';
import { TipoDocumentoListComponent } from './tipodocumento-list.component';
import { TipoDocumentoListResolver } from './tipodocumento-list.resolver';

export const routes: Routes = [
  {
    path: 'tipos-documento',
    canActivateChild: [authGuard, permissionGuard],
    children: [
      {
        path: '',
        component: TipoDocumentoListComponent,
        data: {
          title: 'TiposDocumento',
          permission: environment.prefijoPermisos + 'TipoDocumentoList',
        },
        resolve: {
        },
      },
      {
        path: ':id',
        component: TipoDocumentoDetailComponent,
        data: {
          title: 'TiposDocumento - Detalle',
          permission: environment.prefijoPermisos + 'TipoDocumentoDetail',
        },
        resolve: {
          tipoDocumento: TipoDocumentoDetailResolver,
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
    TipoDocumentoDetailResolver,
    TipoDocumentoListResolver,
  ],
})
export class TipoDocumentoRoutingModule {}
