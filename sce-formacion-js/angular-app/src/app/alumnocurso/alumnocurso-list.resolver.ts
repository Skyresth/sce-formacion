import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { GrowlService, ResponseList } from 'angular-sce-commons';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AlumnoCurso } from './alumnocurso';
import { AlumnoCursoService } from './alumnocurso.service';

@Injectable()
export class AlumnoCursoListResolver implements Resolve<ResponseList<AlumnoCurso>> {
  constructor(private alumnoCursoService: AlumnoCursoService, private growlService: GrowlService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.alumnoCursoService.query().pipe(
      catchError(error => {
        this.growlService.showError('Error', error);
        return throwError(error);
      }),
    );
  }
}
