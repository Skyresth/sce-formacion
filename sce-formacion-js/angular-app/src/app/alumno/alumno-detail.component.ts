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
  SelectItemService,
  ValidationMessages,
} from 'angular-sce-commons';
import { first } from 'rxjs/operators';

import { SearchService } from '../core';
import { Alumno } from './alumno';
import { AlumnoService } from './alumno.service';
import { TipoDocumento } from '../tipodocumento';
import { CursoTableComponent } from '../curso/table/curso-table.component';
import { AlumnoCurso } from '../alumnocurso/alumnocurso';
import { AlumnoCursoService } from '../alumnocurso/alumnocurso.service';
import { SelectItem } from 'primeng/api';

@Component({
  templateUrl: './alumno-detail.component.html'
})
export class AlumnoDetailComponent implements OnInit, CanComponentDeactivate {
  model: Alumno;
  @ViewChild('unlinkedCursos') unlinkedCursos: CursoTableComponent;
  @ViewChild('linkedCursos') linkedCursos: CursoTableComponent;
  unlinkedCursosFilters: Filters;
  linkedCursosFilters: Filters;
  selectItemsTiposDocumento: SelectItem[];

  alumnoForm: FormGroup;
  formErrors: FormErrors = {
    'nombre': [],
    'apellido1': [],
    'apellido2': [],
    'idTipoDocumento': [],
    'numeroDocumento': [],
    'fechaNacimiento': [],
    'observaciones': [],
  };
  private validationMessages: ValidationMessages = {
    'nombre': {
      'required': 'Requerido',
      'minlength': 'Longitud mínima: 2 caracteres',
      'maxlength': 'Longitud máxima: 100 caracteres',
      'pattern': 'Formato incorrecto'
    },
    'apellido1': {
      'required': 'Requerido',
      'minlength': 'Longitud mínima: 2 caracteres',
      'maxlength': 'Longitud máxima: 100 caracteres',
      'pattern': 'Formato incorrecto'
    },
    'apellido2': {
      'maxlength': 'Longitud máxima: 100 caracteres',
      'pattern': 'Formato incorrecto'
    },
    'idTipoDocumento': {
    },
    'numeroDocumento': {
      'required': 'Requerido',
      'maxlength': 'Longitud máxima: 9 caracteres',
    },
    'fechaNacimiento': {
      'required': 'Requerido',
    },
    'observaciones': {
      'maxlength': 'Longitud máxima: 1000 caracteres',
    },
  };
  private disabledFields: any = {};
  private forceDeactivate = false;

  currentTab = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alumnoService: AlumnoService,
    private growlService: GrowlService,
    private fb: FormBuilder,
    private formService: FormService,
    private confirmService: ConfirmService,
    private location: Location,
    private routeService: RouteService,
    private searchService: SearchService,
    private selectItemService: SelectItemService,
    private alumnoCursoService: AlumnoCursoService,
    public calendarLocale: CalendarLocale
  ) {}

  ngOnInit() {
    this.linkCurso = this.linkCurso.bind(this);
    this.unlinkCurso = this.unlinkCurso.bind(this);
    this.goToDetailCurso = this.goToDetailCurso.bind(this);
    this.addCurso = this.addCurso.bind(this);

    this.route.data.forEach((response: {
        alumno: Alumno,
        tiposDocumento: ResponseList<TipoDocumento>
      }) => {
        this.model = response.alumno;

        this.routeService.setRouteParamsToModel(this.route.snapshot, this.model, this.disabledFields);
        this.buildForm();
        this.formService.disableFields(this.alumnoForm, this.disabledFields);

        this.initTabView(this.model.idAlumno);

        this.linkedCursosFilters = {
          alumnos_idAlumno: {
            value: this.model.idAlumno
          }
        };
        this.unlinkedCursosFilters = {
          alumnos_idAlumno: {
            value: this.model.idAlumno,
            not: true
          }
        };
        this.selectItemsTiposDocumento = this.selectItemService.toSelectItemArray({
          items: response.tiposDocumento.data,
          labelKey: 'descripcion',
          valueKey: 'idTipoDocumento',
        });
      }
    );
  }

  private initTabView(idAlumno) {
    const storedStatus = this.getTabViewStatus(idAlumno);
    this.currentTab = storedStatus ? storedStatus['currentTab'] : 0;
    this.setTabViewStatus(this.model.idAlumno, null);
  }

  private getTabViewStatus(idAlumno) {
    return this.searchService.getStoredStatus('alumnos.' + idAlumno);
  }

  private setTabViewStatus(idAlumno, status) {
    this.searchService.storeStatus('alumnos.' + idAlumno, status);
  }

  private buildForm() {
    this.alumnoForm = this.fb.group({
      'nombre': [this.model.nombre, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.pattern('[^0-9*_?]+')
      ]],
      'apellido1': [this.model.apellido1, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.pattern('[^0-9*_?]+')
      ]],
      'apellido2': [this.model.apellido2, [
        Validators.maxLength(100),
        Validators.pattern('[^0-9*_?]+')
      ]],
      'idTipoDocumento': [this.model.idTipoDocumento, [
      ]],
      'numeroDocumento': [this.model.numeroDocumento, [
        Validators.required,
        Validators.maxLength(9),
      ]],
      'fechaNacimiento': [this.model.fechaNacimiento ? new Date(this.model.fechaNacimiento) : null, [
        Validators.required,
      ]],
      'observaciones': [this.model.observaciones, [
        Validators.maxLength(1000),
      ]],
    });

    this.alumnoForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  private onValueChanged(data?: any) {
    if (!this.alumnoForm) { return; }
    const form = this.alumnoForm;
    this.model = Object.assign(this.model, form.value);
    this.formService.validate(form, this.formErrors, this.validationMessages);
  }

  updateCursosTables() {
    this.unlinkedCursos.search();
    this.linkedCursos.search();
  }

  linkCurso(rowData: any) {
    this.alumnoService.saveAlumnoCurso(this.model.idAlumno, rowData.idCurso).subscribe(
      response => {
        this.updateCursosTables();
        this.growlService.showSuccess('¡Hecho!', 'Acción completada con éxito');
      },
      error => this.growlService.showError('Error', error)
    );
  }

  unlinkCurso(rowData: any) {
    this.alumnoService.deleteAlumnoCurso(this.model.idAlumno, rowData.idCurso).subscribe(
      response => {
        this.updateCursosTables();
        this.growlService.showSuccess('¡Hecho!', 'Acción completada con éxito');
      },
      error => this.growlService.showError('Error', error)
    );
  }

  goToDetailCurso(rowData: any) {
    this.setTabViewStatus(this.model.idAlumno, { currentTab: this.currentTab });
    this.router.navigate(['/cursos', rowData.idCurso]);
  }

  addCurso() {
    this.setTabViewStatus(this.model.idAlumno, { currentTab: this.currentTab });
    this.router.navigate(['/cursos', 'new', { idAlumno: this.model.idAlumno }]);
  }

  handleTabChange(e) {
    this.currentTab = e.index;
  }

  goBack() {
    this.location.back();
  }

  private createAlumnoCurso(alumno: Alumno) {
    if (this.disabledFields.idCurso !== undefined) {
      const alumnoCurso = new AlumnoCurso();
      alumnoCurso.idCurso = this.disabledFields.idCurso;
      alumnoCurso.idAlumno = alumno.idAlumno;
      this.alumnoCursoService.save(alumnoCurso).subscribe();
    }
  }

  save() {
    this.alumnoService.save(this.model).subscribe(
      alumno => {
        this.forceDeactivate = true;
        this.growlService.showSuccess('¡Hecho!', 'Acción completada con éxito');
        this.createAlumnoCurso(alumno);
        this.goBack();
      },
      error => this.growlService.showError('Error', error)
    );
  }

  delete() {
    this.confirmService.confirm('¿Desea eliminar este elemento?').pipe(
      first(confirm => confirm === true)
    ).subscribe(
      () => this.alumnoService.delete(this.model.idAlumno).subscribe(
        alumno => {
          this.forceDeactivate = true;
          this.growlService.showSuccess('¡Hecho!', 'Acción completada con éxito');
          this.goBack();
        },
        error => this.growlService.showError('Error', error)
      )
    );
  }

  canDeactivate() {
    if (this.forceDeactivate || this.alumnoForm.pristine) {
      return true;
    }

    return this.confirmService.confirm('¿Desea descartar los cambios?').pipe(first());
  }
}
