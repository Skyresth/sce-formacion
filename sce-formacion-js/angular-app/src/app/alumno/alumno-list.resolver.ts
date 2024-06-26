import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { GrowlService, ResponseList } from 'angular-sce-commons';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Alumno } from './alumno';
import { AlumnoService } from './alumno.service';

@Injectable()
export class AlumnoListResolver implements Resolve<ResponseList<Alumno>> {
  constructor(private alumnoService: AlumnoService, private growlService: GrowlService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.alumnoService.query().pipe(
      catchError(error => {
        this.growlService.showError('Error', error);
        return throwError(error);
      }),
    );
  }
}
