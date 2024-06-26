import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { TipoDocumentoDetailComponent } from './tipodocumento-detail.component';
import { TipoDocumentoListComponent } from './tipodocumento-list.component';
import { TipoDocumentoRoutingModule } from './tipodocumento-routing.module';
import { TipoDocumentoTableModule } from './table/tipodocumento-table.module';
import { TipoDocumentoService } from './tipodocumento.service';
import { AlumnoTableModule } from '../alumno/table/alumno-table.module';

@NgModule({
  imports: [
    SharedModule,
    TipoDocumentoRoutingModule,
    TipoDocumentoTableModule,
    AlumnoTableModule,
  ],
  declarations: [
    TipoDocumentoDetailComponent,
    TipoDocumentoListComponent,
  ],
  providers: [
    TipoDocumentoService,
  ],
})
export class TipoDocumentoModule {}
