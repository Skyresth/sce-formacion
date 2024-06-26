import { Injectable } from '@angular/core';
import { SceMenuItem } from 'angular-sce-commons';

import { environment } from '../../environments/environment';

@Injectable()
export class MainMenuService {
  getItems() {
    const permissionSecured = environment.routeGuards.permissionGuard;
    const items: SceMenuItem[] = [
      {
        label: 'Alumnos',
        icon: 'fa fa-graduation-cap',
        routerLink: ['/alumnos'],
        permissions: permissionSecured ? [environment.prefijoPermisos + 'AlumnoList'] : null,
        items: [
          {
            label: 'Buscar',
            routerLink: ['/alumnos'],
            permissions: permissionSecured ? [environment.prefijoPermisos + 'AlumnoList'] : null,
          },
          {
            label: 'Crear',
            routerLink: ['/alumnos/new'],
            permissions: permissionSecured ? [environment.prefijoPermisos + 'AlumnoDetail'] : null,
          },
        ],
      },
      {
        label: 'Cursos',
        icon: 'fa fa-book',
        routerLink: ['/cursos'],
        permissions: permissionSecured ? [environment.prefijoPermisos + 'CursoList'] : null,
        items: [
          {
            label: 'Buscar',
            routerLink: ['/cursos'],
            permissions: permissionSecured ? [environment.prefijoPermisos + 'CursoList'] : null,
          },
          {
            label: 'Crear',
            routerLink: ['/cursos/new'],
            permissions: permissionSecured ? [environment.prefijoPermisos + 'CursoDetail'] : null,
          },
        ],
      },
      {
        label: 'Administración',
        items: [
          {
            label: 'Tipos documento',
            routerLink: ['/tipos-documento'],
            permissions: permissionSecured ? [environment.prefijoPermisos + 'TipoDocumentoList'] : null,
          },
        ],
        permissions: permissionSecured ? [environment.prefijoPermisos + 'TipoDocumentoList'] : null,
        profiles: [environment.perfilAdmin],
      },
    ];

    return items;
  }
}
