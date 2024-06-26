import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  Filters,
  FilterService,
  GrowlService,
  Pageable,
} from 'angular-sce-commons';
import {
  LazyLoadEvent,
} from 'primeng/api';
import { Table } from 'primeng/table';

import { environment } from '../../../environments/environment';
import { SearchService } from '../../core';

import { TipoDocumento } from '../tipodocumento';
import { TipoDocumentoService } from '../tipodocumento.service';

@Component({
  selector: 'app-tipodocumento-table',
  templateUrl: './tipodocumento-table.component.html'
})
export class TipoDocumentoTableComponent implements OnInit, OnDestroy {
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

  filters: Filters;
  private emptyFilters: Filters = {
    descripcion: {},
  };

  cols = [
    { field: 'descripcion', header: 'Descripcion' },
  ];

  tableValue: TipoDocumento[];
  totalRecords: number;
  rowsPerPageOptions: number[];
  tableStatus: any;

  searching = false;

  constructor(
    private tipoDocumentoService: TipoDocumentoService,
    private filterService: FilterService,
    private growlService: GrowlService,
    private searchService: SearchService,
  ) {}

  ngOnInit() {
    this.loadData = this.loadData.bind(this);

    this.clearFilters();
    this.tableStatus = this.getInitialTableStatus();
    this.rowsPerPageOptions = [environment.rowsPerPage, environment.rowsPerPage * 2, environment.rowsPerPage * 5];

    if (this.rememberFilters) {
      this.loadSearchStatus();
    }
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

    const search$ = this.tipoDocumentoService.query(mergedFilters, pageable);

    search$.subscribe(
      tiposDocumento => {
        this.totalRecords = tiposDocumento.totalRecords;
        this.tableValue = tiposDocumento.data;
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

  addTipoDocumento() {
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
    const storedStatus = this.searchService.getStoredStatus('tiposDocumento');
    if (storedStatus) {
      this.filters = Object.assign(this.filters, storedStatus['filters']);
      this.tableStatus = Object.assign(this.tableStatus, storedStatus['tableStatus']);
    }
  }

  private storeSearchStatus() {
    this.searchService.storeStatus('tiposDocumento', {
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
