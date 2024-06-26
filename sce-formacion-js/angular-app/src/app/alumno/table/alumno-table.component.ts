import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  CalendarLocale,
  Filters,
  FilterService,
  GrowlService,
  Pageable,
  SelectItemService,
} from 'angular-sce-commons';
import {
  LazyLoadEvent,
  SelectItem,
} from 'primeng/api';
import { Table } from 'primeng/table';

import { environment } from '../../../environments/environment';
import { SearchService } from '../../core';

import { Alumno } from '../alumno';
import { AlumnoService } from '../alumno.service';
import { TipoDocumento } from '../../tipodocumento';

@Component({
  selector: 'app-alumno-table',
  templateUrl: './alumno-table.component.html'
})
export class AlumnoTableComponent implements OnInit, OnDestroy {
  @Input() tiposDocumento: TipoDocumento[];

  @Input() clickAction: Function;

  @Input() primaryButtonAction: Function;

  @Input() primaryButtonText: string;

  @Input() primaryButtonClass: string;

  @Input() add: Function;

  @Input() expandFilters: boolean;

  @Input() fixedFilters: Filters = {};

  @Input() rememberFilters = true;

  @Input() name: string;

  @Input() showResultsLabel = false;

  @ViewChild('tt', { static: true }) private table: Table;

  selectItemsTiposDocumento: SelectItem[];
  filters: Filters;
  private emptyFilters: Filters = {
    nombre: {},
    apellido1: {},
    apellido2: {},
    idTipoDocumento: {},
    numeroDocumento: {},
    fechaNacimiento: {},
    observaciones: {},
    cursos_idCurso: {},
  };

  cols = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'apellido1', header: 'Apellido1' },
    { field: 'apellido2', header: 'Apellido2' },
    { field: 'tipoDocumento', header: 'Tipo documento', link: 'descripcion' },
    { field: 'numeroDocumento', header: 'Numero documento' },
    { field: 'fechaNacimiento', header: 'Fecha nacimiento', date: true },
    { field: 'observaciones', header: 'Observaciones' },
  ];

  tableValue: Alumno[];
  totalRecords: number;
  rowsPerPageOptions: number[];
  tableStatus: any;

  searching = false;

  constructor(
    private alumnoService: AlumnoService,
    public calendarLocale: CalendarLocale,
    private filterService: FilterService,
    private growlService: GrowlService,
    private searchService: SearchService,
    private selectItemService: SelectItemService,
  ) {}

  ngOnInit() {
    this.loadData = this.loadData.bind(this);

    this.clearFilters();
    this.tableStatus = this.getInitialTableStatus();
    this.rowsPerPageOptions = [environment.rowsPerPage, environment.rowsPerPage * 2, environment.rowsPerPage * 5];

    if (this.rememberFilters) {
      this.loadSearchStatus();
    }

    this.selectItemsTiposDocumento = this.selectItemService.toSelectItemArray({
      items: this.tiposDocumento,
      labelKey: 'descripcion',
      valueKey: 'idTipoDocumento',
    }, this.fixedFilters.idTipoDocumento);
  }

  ngOnDestroy() {
    if (this.rememberFilters) {
      this.storeSearchStatus();
    }
  }

  clearFilters() {
    this.filters = this.filterService.getInitialFilters(this.emptyFilters, this.fixedFilters);
  }

  getFilterDisabledStatus(fixedFilter) {
    return this.filterService.getFilterDisabledStatus(fixedFilter);
  }

  search(pageable?: Pageable) {
    const mergedFilters = this.filterService.getMergedFilters(this.filters, this.fixedFilters);
    Promise.resolve().then(() => this.searching = true);

    const search$ = this.primaryButtonAction ?
      this.alumnoService.searchLinks(mergedFilters, pageable) :
      this.alumnoService.query(mergedFilters, pageable);

    search$.subscribe(
      alumnos => {
        this.totalRecords = alumnos.totalRecords;
        this.tableValue = alumnos.data;
        this.searching = false;
      },
      error => {
        this.growlService.showError('Error', error);
        this.searching = false;
      }
    );
  }

  clearSearch() {
    this.clearFilters();
  }

  loadData(event: LazyLoadEvent) {
    this.search({ pageIndex: event.first / event.rows, pageSize: event.rows, sortField: event.sortField, sortOrder: event.sortOrder });
  }

  addAlumno() {
    this.add();
  }

  private getInitialTableStatus() {
    return {
      first: 0,
      rows: environment.rowsPerPage,
      sortField: null,
      sortOrder: 1
    };
  }

  private loadSearchStatus() {
    const storedStatus = this.searchService.getStoredStatus('alumnos');
    if (storedStatus) {
      this.filters = Object.assign(this.filters, storedStatus['filters']);
      this.filters = this.searchService.transformDateFilters(this.filters);
      this.tableStatus = Object.assign(this.tableStatus, storedStatus['tableStatus']);
    }
  }

  private storeSearchStatus() {
    this.searchService.storeStatus('alumnos', {
      filters: this.filters,
      tableStatus: {
        first: this.table.first,
        rows: this.table.rows,
        sortField: this.table.sortField,
        sortOrder: this.table.sortOrder,
      },
    });
  }
}
