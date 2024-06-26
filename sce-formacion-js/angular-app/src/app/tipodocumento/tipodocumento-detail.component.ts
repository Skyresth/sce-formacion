import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
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
import { TipoDocumento } from './tipodocumento';
import { TipoDocumentoService } from './tipodocumento.service';
import { Alumno } from '../alumno/alumno';
import { AlumnoService } from '../alumno/alumno.service';
import { AlumnoTableComponent } from '../alumno/table/alumno-table.component';

@Component({
  templateUrl: './tipodocumento-detail.component.html'
})
export class TipoDocumentoDetailComponent implements OnInit, CanComponentDeactivate {
  model: TipoDocumento;
  tiposDocumento: TipoDocumento[];
  @ViewChild('unlinkedAlumnos') unlinkedAlumnos: AlumnoTableComponent;
  @ViewChild('linkedAlumnos') linkedAlumnos: AlumnoTableComponent;
  unlinkedAlumnosFilters: Filters;
  linkedAlumnosFilters: Filters;

  tipoDocumentoForm: FormGroup;
  formErrors: FormErrors = {
    'descripcion': [],
  };
  private validationMessages: ValidationMessages = {
    'descripcion': {
      'required': 'Requerido',
      'maxlength': 'Longitud máxima: 100 caracteres',
    },
  };
  private disabledFields: any = {};
  private forceDeactivate = false;

  currentTab = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tipoDocumentoService: TipoDocumentoService,
    private growlService: GrowlService,
    private fb: FormBuilder,
    private formService: FormService,
    private confirmService: ConfirmService,
    private location: Location,
    private routeService: RouteService,
    private searchService: SearchService,
    private alumnoService: AlumnoService,
  ) {}

  ngOnInit() {
    this.linkAlumno = this.linkAlumno.bind(this);
    this.unlinkAlumno = this.unlinkAlumno.bind(this);
    this.goToDetailAlumno = this.goToDetailAlumno.bind(this);
    this.addAlumno = this.addAlumno.bind(this);

    this.route.data.forEach((response: {
        tipoDocumento: TipoDocumento,
        tiposDocumento: ResponseList<TipoDocumento>,
      }) => {
        this.model = response.tipoDocumento;

        this.routeService.setRouteParamsToModel(this.route.snapshot, this.model, this.disabledFields);
        this.buildForm();
        this.formService.disableFields(this.tipoDocumentoForm, this.disabledFields);

        this.initTabView(this.model.idTipoDocumento);

        this.tiposDocumento = response.tiposDocumento.data;
        this.linkedAlumnosFilters = {
          idTipoDocumento: {
            value: this.model.idTipoDocumento
          }
        };
        this.unlinkedAlumnosFilters = {
          idTipoDocumento: {
            value: this.model.idTipoDocumento,
            not: true
          }
        };
      }
    );
  }

  private initTabView(idTipoDocumento) {
    const storedStatus = this.getTabViewStatus(idTipoDocumento);
    this.currentTab = storedStatus ? storedStatus['currentTab'] : 0;
    this.setTabViewStatus(this.model.idTipoDocumento, null);
  }

  private getTabViewStatus(idTipoDocumento) {
    return this.searchService.getStoredStatus('tiposDocumento.' + idTipoDocumento);
  }

  private setTabViewStatus(idTipoDocumento, status) {
    this.searchService.storeStatus('tiposDocumento.' + idTipoDocumento, status);
  }

  private buildForm() {
    this.tipoDocumentoForm = this.fb.group({
      'descripcion': [this.model.descripcion, [
        Validators.required,
        Validators.maxLength(100),
      ]],
    });

    this.tipoDocumentoForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  private onValueChanged(data?: any) {
    if (!this.tipoDocumentoForm) { return; }
    const form = this.tipoDocumentoForm;
    this.model = Object.assign(this.model, form.value);
    this.formService.validate(form, this.formErrors, this.validationMessages);
  }

  updateAlumnosTables() {
    this.unlinkedAlumnos.search();
    this.linkedAlumnos.search();
  }

  editAlumno(alumno: Alumno, idTipoDocumento: number) {
    alumno.idTipoDocumento = idTipoDocumento;
    this.alumnoService.save(alumno).subscribe(
      response => {
        this.updateAlumnosTables();
        this.growlService.showSuccess('¡Hecho!', 'Acción completada con éxito');
      },
      error => this.growlService.showError('Error', error)
    );
  }

  linkAlumno(rowData: any) {
    this.alumnoService.getAlumno(rowData.idAlumno).subscribe(
      alumno => this.editAlumno(alumno, this.model.idTipoDocumento),
      error => this.growlService.showError('Error', error)
    );
  }

  unlinkAlumno(rowData: any) {
    this.alumnoService.getAlumno(rowData.idAlumno).subscribe(
      alumno => this.editAlumno(alumno, null),
      error => this.growlService.showError('Error', error)
    );
  }

  goToDetailAlumno(rowData: any) {
    this.setTabViewStatus(this.model.idTipoDocumento, { currentTab: this.currentTab });
    this.router.navigate(['/alumnos', rowData.idAlumno]);
  }

  addAlumno() {
    this.setTabViewStatus(this.model.idTipoDocumento, { currentTab: this.currentTab });
    this.router.navigate(['/alumnos', 'new', { idTipoDocumento: this.model.idTipoDocumento }]);
  }

  handleTabChange(e) {
    this.currentTab = e.index;
  }

  goBack() {
    this.location.back();
  }

  save() {
    this.tipoDocumentoService.save(this.model).subscribe(
      tipoDocumento => {
        this.forceDeactivate = true;
        this.growlService.showSuccess('¡Hecho!', 'Acción completada con éxito');
        this.goBack();
      },
      error => this.growlService.showError('Error', error)
    );
  }

  delete() {
    this.confirmService.confirm('¿Desea eliminar este elemento?').pipe(
      first(confirm => confirm === true)
    ).subscribe(
      () => this.tipoDocumentoService.delete(this.model.idTipoDocumento).subscribe(
        tipoDocumento => {
          this.forceDeactivate = true;
          this.growlService.showSuccess('¡Hecho!', 'Acción completada con éxito');
          this.goBack();
        },
        error => this.growlService.showError('Error', error)
      )
    );
  }

  canDeactivate() {
    if (this.forceDeactivate || this.tipoDocumentoForm.pristine) {
      return true;
    }

    return this.confirmService.confirm('¿Desea descartar los cambios?').pipe(first());
  }
}
