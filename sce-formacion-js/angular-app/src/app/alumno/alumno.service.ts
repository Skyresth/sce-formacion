import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  Filters,
  FilterService,
  HttpResponseHandler,
  Pageable,
  QueryService,
  ResponseBody,
  ResponseList,
} from 'angular-sce-commons';
import { catchError, map } from 'rxjs/operators';

import { BASE_PATH } from '../app.constants';

import { Alumno } from './alumno';
import { AlumnoCurso } from '../alumnocurso';

@Injectable()
export class AlumnoService extends HttpResponseHandler {
  private baseApiUrl: string;
  private alumnosUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(BASE_PATH) basePath: string,
    private filterService: FilterService,
    private queryService: QueryService,
  ) {
    super();
    this.baseApiUrl = `${basePath}api/v1.0`;
    this.alumnosUrl = `${this.baseApiUrl}/alumnos`;
  }

  query(filters?: Filters, pageable?: Pageable) {
    const options = { params: this.queryService.buildQueryParams(filters, pageable) };

    return this.http.get<ResponseBody<ResponseList<Alumno>>>(this.alumnosUrl, options).pipe(
      map(body => body.data),
      catchError(err => this.handleError(err))
    );
  }

  getAlumno(idAlumno: number | string) {
    const url = `${this.alumnosUrl}/${idAlumno}`;

    return this.http.get<ResponseBody<Alumno>>(url).pipe(
      map(body => body.data),
      catchError(err => this.handleError(err))
    );
  }

  save(alumno: Alumno) {
    if (alumno.idAlumno) {
      return this.put(alumno);
    }

    return this.post(alumno);
  }

  delete(idAlumno: number) {
    const url = `${this.alumnosUrl}/${idAlumno}`;

    return this.http.delete<any>(url).pipe(
      catchError(err => this.handleError(err))
    );
  }

  private post(alumno: Alumno) {
    return this.http.post<ResponseBody<Alumno>>(this.alumnosUrl, alumno).pipe(
      map(body => body.data),
      catchError(err => this.handleError(err))
    );
  }

  private put(alumno: Alumno) {
    const url = `${this.alumnosUrl}/${alumno.idAlumno}`;

    return this.http.put<ResponseBody<Alumno>>(url, alumno).pipe(
      map(body => body.data),
      catchError(err => this.handleError(err))
    );
  }

  saveAlumnoCurso(idAlumno: number, idCurso: number) {
    const url = `${this.alumnosUrl}/${idAlumno}/cursos/${idCurso}`;

    return this.http.post<ResponseBody<AlumnoCurso>>(url, null).pipe(
      map(body => body.data),
      catchError(err => this.handleError(err))
    );
  }

  deleteAlumnoCurso(idAlumno: number, idCurso: number) {
    const url = `${this.alumnosUrl}/${idAlumno}/cursos/${idCurso}`;

    return this.http.delete<any>(url).pipe(
      catchError(err => this.handleError(err))
    );
  }


  searchLinks(filters?: Filters, pageable?: Pageable) {
    const url = `${this.alumnosUrl}/search-links`;

    const options = { params: this.filterService.buildSearchParams(filters, pageable) };

    return this.http.get<ResponseBody<ResponseList<Alumno>>>(url, options).pipe(
      map(body => body.data),
      catchError(err => this.handleError(err))
    );
  }
}
