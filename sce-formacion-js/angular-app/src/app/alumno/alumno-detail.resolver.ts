import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { GrowlService } from 'angular-sce-commons';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Alumno } from './alumno';
import { AlumnoService } from './alumno.service';

@Injectable()
export class AlumnoDetailResolver implements Resolve<Alumno> {
  constructor(private alumnoService: AlumnoService, private growlService: GrowlService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['id'];

    if (id === 'new') {
      return new Alumno();
    } else {
      return this.alumnoService.getAlumno(id).pipe(
        catchError(error => {
          this.growlService.showError('Error', error);
          this.router.navigate(['/alumnos']);
          return throwError(error);
        }),
      );
    }
  }
}
