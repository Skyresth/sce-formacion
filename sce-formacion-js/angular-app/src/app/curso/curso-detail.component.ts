import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CalendarLocale,
  CanComponentDeactivate,
  ConfirmService,
  Filters,
  FormErrors,
  FormService,
  GrowlService,
  ResponseList,
  RouteService,
  ValidationMessages,
} from 'angular-sce-commons';
import { first } from 'rxjs/operators';

import { SearchService } from '../core';
import { Curso } from './curso';
import { CursoService } from './curso.service';
import { AlumnoTableComponent } from '../alumno/table/alumno-table.component';
import { AlumnoCurso } from '../alumnocurso/alumnocurso';
import { AlumnoCursoService } from '../alumnocurso/alumnocurso.service';
import { TipoDocumento } from '../tipodocumento/tipodocumento';

@Component({
  templateUrl: './curso-detail.component.html'
})
export class CursoDetailComponent implements OnInit, CanComponentDeactivate {
  model: Curso;
  tiposDocumento: TipoDocumento[];
  @ViewChild('unlinkedAlumnos') unlinkedAlumnos: AlumnoTableComponent;
  @ViewChild('linkedAlumnos') linkedAlumnos: AlumnoTableComponent;
  unlinkedAlumnosFilters: Filters;
  linkedAlumnosFilters: Filters;

  cursoForm: FormGroup;
  formErrors: FormErrors = {
    'nombre': [],
    'fechaInicio': [],
    'fechaFin': [],
  };
  private validationMessages: ValidationMessages = {
    'nombre': {
      'required': 'Requerido',
      'maxlength': 'Longitud máxima: 100 caracteres',
    },
    'fechaInicio': {
    },
    'fechaFin': {
    },
  };
  private disabledFields: any = {};
  private forceDeactivate = false;

  currentTab = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cursoService: CursoService,
    private growlService: GrowlService,
    private fb: FormBuilder,
    private formService: FormService,
    private confirmService: ConfirmService,
    private location: Location,
    private routeService: RouteService,
    private searchService: SearchService,
    private alumnoCursoService: AlumnoCursoService,
    public calendarLocale: CalendarLocale
  ) {}

  ngOnInit() {
    this.linkAlumno = this.linkAlumno.bind(this);
    this.unlinkAlumno = this.unlinkAlumno.bind(this);
    this.goToDetailAlumno = this.goToDetailAlumno.bind(this);
    this.addAlumno = this.addAlumno.bind(this);

    this.route.data.forEach((response: {
        curso: Curso,
        tiposDocumento: ResponseList<TipoDocumento>,
      }) => {
        this.model = response.curso;

        this.routeService.setRouteParamsToModel(this.route.snapshot, this.model, this.disabledFields);
        this.buildForm();
        this.formService.disableFields(this.cursoForm, this.disabledFields);

        this.initTabView(this.model.idCurso);

        this.tiposDocumento = response.tiposDocumento.data;
        this.linkedAlumnosFilters = {
          cursos_idCurso: {
            value: this.model.idCurso
          }
        };
        this.unlinkedAlumnosFilters = {
          cursos_idCurso: {
            value: this.model.idCurso,
            not: true
          }
        };
      }
    );
  }

  private initTabView(idCurso) {
    const storedStatus = this.getTabViewStatus(idCurso);
    this.currentTab = storedStatus ? storedStatus['currentTab'] : 0;
    this.setTabViewStatus(this.model.idCurso, null);
  }

  private getTabViewStatus(idCurso) {
    return this.searchService.getStoredStatus('cursos.' + idCurso);
  }

  private setTabViewStatus(idCurso, status) {
    this.searchService.storeStatus('cursos.' + idCurso, status);
  }

  private buildForm() {
    this.cursoForm = this.fb.group({
      'nombre': [this.model.nombre, [
        Validators.required,
        Validators.maxLength(100),
      ]],
      'fechaInicio': [this.model.fechaInicio ? new Date(this.model.fechaInicio) : null, [
      ]],
      'fechaFin': [this.model.fechaFin ? new Date(this.model.fechaFin) : null, [
      ]],
    });

    this.cursoForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  private onValueChanged(data?: any) {
    if (!this.cursoForm) { return; }
    const form = this.cursoForm;
    this.model = Object.assign(this.model, form.value);
    this.formService.validate(form, this.formErrors, this.validationMessages);
  }

  updateAlumnosTables() {
    this.unlinkedAlumnos.search();
    this.linkedAlumnos.search();
  }

  linkAlumno(rowData: any) {
    this.cursoService.saveAlumnoCurso(this.model.idCurso, rowData.idAlumno).subscribe(
      response => {
        this.updateAlumnosTables();
        this.growlService.showSuccess('¡Hecho!', 'Acción completada con éxito');
      },
      error => this.growlService.showError('Error', error)
    );
  }

  unlinkAlumno(rowData: any) {
    this.cursoService.deleteAlumnoCurso(this.model.idCurso, rowData.idAlumno).subscribe(
      response => {
        this.updateAlumnosTables();
        this.growlService.showSuccess('¡Hecho!', 'Acción completada con éxito');
      },
      error => this.growlService.showError('Error', error)
    );
  }

  goToDetailAlumno(rowData: any) {
    this.setTabViewStatus(this.model.idCurso, { currentTab: this.currentTab });
    this.router.navigate(['/alumnos', rowData.idAlumno]);
  }

  addAlumno() {
    this.setTabViewStatus(this.model.idCurso, { currentTab: this.currentTab });
    this.router.navigate(['/alumnos', 'new', { idCurso: this.model.idCurso }]);
  }

  handleTabChange(e) {
    this.currentTab = e.index;
  }

  goBack() {
    this.location.back();
  }

  private createAlumnoCurso(curso: Curso) {
    if (this.disabledFields.idAlumno !== undefined) {
      const alumnoCurso = new AlumnoCurso();
      alumnoCurso.idAlumno = this.disabledFields.idAlumno;
      alumnoCurso.idCurso = curso.idCurso;
      this.alumnoCursoService.save(alumnoCurso).subscribe();
    }
  }

  save() {
    this.cursoService.save(this.model).subscribe(
      curso => {
        this.forceDeactivate = true;
        this.growlService.showSuccess('¡Hecho!', 'Acción completada con éxito');
        this.createAlumnoCurso(curso);
        this.goBack();
      },
      error => this.growlService.showError('Error', error)
    );
  }

  delete() {
    this.confirmService.confirm('¿Desea eliminar este elemento?').pipe(
      first(confirm => confirm === true)
    ).subscribe(
      () => this.cursoService.delete(this.model.idCurso).subscribe(
        curso => {
          this.forceDeactivate = true;
          this.growlService.showSuccess('¡Hecho!', 'Acción completada con éxito');
          this.goBack();
        },
        error => this.growlService.showError('Error', error)
      )
    );
  }

  canDeactivate() {
    if (this.forceDeactivate || this.cursoForm.pristine) {
      return true;
    }

    return this.confirmService.confirm('¿Desea descartar los cambios?').pipe(first());
  }
}
