import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { GrowlService } from 'angular-sce-commons';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Curso } from './curso';
import { CursoService } from './curso.service';

@Injectable()
export class CursoDetailResolver implements Resolve<Curso> {
  constructor(private cursoService: CursoService, private growlService: GrowlService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['id'];

    if (id === 'new') {
      return new Curso();
    } else {
      return this.cursoService.getCurso(id).pipe(
        catchError(error => {
          this.growlService.showError('Error', error);
          this.router.navigate(['/cursos']);
          return throwError(error);
        }),
      );
    }
  }
}
