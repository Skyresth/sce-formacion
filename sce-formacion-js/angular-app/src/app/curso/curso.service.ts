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

import { Curso } from './curso';
import { AlumnoCurso } from '../alumnocurso';

@Injectable()
export class CursoService extends HttpResponseHandler {
  private baseApiUrl: string;
  private cursosUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(BASE_PATH) basePath: string,
    private filterService: FilterService,
    private queryService: QueryService,
  ) {
    super();
    this.baseApiUrl = `${basePath}api/v1.0`;
    this.cursosUrl = `${this.baseApiUrl}/cursos`;
  }

  query(filters?: Filters, pageable?: Pageable) {
    const options = { params: this.queryService.buildQueryParams(filters, pageable) };

    return this.http.get<ResponseBody<ResponseList<Curso>>>(this.cursosUrl, options).pipe(
      map(body => body.data),
      catchError(err => this.handleError(err))
    );
  }

  getCurso(idCurso: number | string) {
    const url = `${this.cursosUrl}/${idCurso}`;

    return this.http.get<ResponseBody<Curso>>(url).pipe(
      map(body => body.data),
      catchError(err => this.handleError(err))
    );
  }

  save(curso: Curso) {
    if (curso.idCurso) {
      return this.put(curso);
    }

    return this.post(curso);
  }

  delete(idCurso: number) {
    const url = `${this.cursosUrl}/${idCurso}`;

    return this.http.delete<any>(url).pipe(
      catchError(err => this.handleError(err))
    );
  }

  private post(curso: Curso) {
    return this.http.post<ResponseBody<Curso>>(this.cursosUrl, curso).pipe(
      map(body => body.data),
      catchError(err => this.handleError(err))
    );
  }

  private put(curso: Curso) {
    const url = `${this.cursosUrl}/${curso.idCurso}`;

    return this.http.put<ResponseBody<Curso>>(url, curso).pipe(
      map(body => body.data),
      catchError(err => this.handleError(err))
    );
  }

  saveAlumnoCurso(idCurso: number, idAlumno: number) {
    const url = `${this.cursosUrl}/${idCurso}/alumnos/${idAlumno}`;

    return this.http.post<ResponseBody<AlumnoCurso>>(url, null).pipe(
      map(body => body.data),
      catchError(err => this.handleError(err))
    );
  }

  deleteAlumnoCurso(idCurso: number, idAlumno: number) {
    const url = `${this.cursosUrl}/${idCurso}/alumnos/${idAlumno}`;

    return this.http.delete<any>(url).pipe(
      catchError(err => this.handleError(err))
    );
  }


  searchLinks(filters?: Filters, pageable?: Pageable) {
    const url = `${this.cursosUrl}/search-links`;

    const options = { params: this.filterService.buildSearchParams(filters, pageable) };

    return this.http.get<ResponseBody<ResponseList<Curso>>>(url, options).pipe(
      map(body => body.data),
      catchError(err => this.handleError(err))
    );
  }
}
