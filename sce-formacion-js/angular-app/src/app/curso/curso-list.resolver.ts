import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { GrowlService, ResponseList } from 'angular-sce-commons';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Curso } from './curso';
import { CursoService } from './curso.service';

@Injectable()
export class CursoListResolver implements Resolve<ResponseList<Curso>> {
  constructor(private cursoService: CursoService, private growlService: GrowlService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.cursoService.query().pipe(
      catchError(error => {
        this.growlService.showError('Error', error);
        return throwError(error);
      }),
    );
  }
}
