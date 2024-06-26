import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { GrowlService } from 'angular-sce-commons';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AlumnoCurso } from './alumnocurso';
import { AlumnoCursoService } from './alumnocurso.service';

@Injectable()
export class AlumnoCursoDetailResolver implements Resolve<AlumnoCurso> {
  constructor(private alumnoCursoService: AlumnoCursoService, private growlService: GrowlService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['id'];

    if (id === 'new') {
      return new AlumnoCurso();
    } else {
      return this.alumnoCursoService.getAlumnoCurso(id).pipe(
        catchError(error => {
          this.growlService.showError('Error', error);
          this.router.navigate(['/alumnos-cursos']);
          return throwError(error);
        }),
      );
    }
  }
}
