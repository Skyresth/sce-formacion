import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'angular-sce-commons';

import { environment } from '../../environments/environment';
import { authGuard, permissionGuard } from '../app.constants';

import { AlumnoCursoDetailComponent } from './alumnocurso-detail.component';
import { AlumnoCursoDetailResolver } from './alumnocurso-detail.resolver';
import { AlumnoCursoListComponent } from './alumnocurso-list.component';
import { AlumnoCursoListResolver } from './alumnocurso-list.resolver';

export const routes: Routes = [
  {
    path: 'alumnos-cursos',
    canActivateChild: [authGuard, permissionGuard],
    children: [
      {
        path: '',
        component: AlumnoCursoListComponent,
        data: {
          title: 'AlumnosCursos',
          permission: environment.prefijoPermisos + 'AlumnoCursoList',
        },
        resolve: {
        },
      },
      {
        path: ':id',
        component: AlumnoCursoDetailComponent,
        data: {
          title: 'AlumnosCursos - Detalle',
          permission: environment.prefijoPermisos + 'AlumnoCursoDetail',
        },
        resolve: {
          alumnoCurso: AlumnoCursoDetailResolver,
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
    AlumnoCursoDetailResolver,
    AlumnoCursoListResolver,
  ],
})
export class AlumnoCursoRoutingModule {}
