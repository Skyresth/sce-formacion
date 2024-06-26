import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CanComponentDeactivate,
  ConfirmService,
  FormErrors,
  FormService,
  GrowlService,
  RouteService,
  ValidationMessages,
} from 'angular-sce-commons';
import { first } from 'rxjs/operators';

import { AlumnoCurso } from './alumnocurso';
import { AlumnoCursoService } from './alumnocurso.service';

@Component({
  templateUrl: './alumnocurso-detail.component.html'
})
export class AlumnoCursoDetailComponent implements OnInit, CanComponentDeactivate {
  model: AlumnoCurso;

  alumnoCursoForm: FormGroup;
  formErrors: FormErrors = {
    'idAlumno': [],
    'idCurso': [],
  };
  private validationMessages: ValidationMessages = {
    'idAlumno': {
      'required': 'Requerido',
    },
    'idCurso': {
      'required': 'Requerido',
    },
  };
  private disabledFields: any = {};
  private forceDeactivate = false;

  constructor(
    private route: ActivatedRoute,
    private alumnoCursoService: AlumnoCursoService,
    private growlService: GrowlService,
    private fb: FormBuilder,
    private formService: FormService,
    private confirmService: ConfirmService,
    private location: Location,
    private routeService: RouteService,
  ) {}

  ngOnInit() {
    this.route.data.forEach((response: {
        alumnoCurso: AlumnoCurso,
      }) => {
        this.model = response.alumnoCurso;

        this.routeService.setRouteParamsToModel(this.route.snapshot, this.model, this.disabledFields);
        this.buildForm();
        this.formService.disableFields(this.alumnoCursoForm, this.disabledFields);

      }
    );
  }

  private buildForm() {
    this.alumnoCursoForm = this.fb.group({
      'idAlumno': [this.model.idAlumno, [
        Validators.required,
      ]],
      'idCurso': [this.model.idCurso, [
        Validators.required,
      ]],
    });

    this.alumnoCursoForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  private onValueChanged(data?: any) {
    if (!this.alumnoCursoForm) { return; }
    const form = this.alumnoCursoForm;
    this.model = Object.assign(this.model, form.value);
    this.formService.validate(form, this.formErrors, this.validationMessages);
  }

  goBack() {
    this.location.back();
  }

  save() {
    this.alumnoCursoService.save(this.model).subscribe(
      alumnoCurso => {
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
      () => this.alumnoCursoService.delete(this.model.idAlumnoCurso).subscribe(
        alumnoCurso => {
          this.forceDeactivate = true;
          this.growlService.showSuccess('¡Hecho!', 'Acción completada con éxito');
          this.goBack();
        },
        error => this.growlService.showError('Error', error)
      )
    );
  }

  canDeactivate() {
    if (this.forceDeactivate || this.alumnoCursoForm.pristine) {
      return true;
    }

    return this.confirmService.confirm('¿Desea descartar los cambios?').pipe(first());
  }
}
