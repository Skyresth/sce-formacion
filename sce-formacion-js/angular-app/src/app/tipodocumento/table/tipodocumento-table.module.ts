import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';

import { TipoDocumentoTableComponent } from './tipodocumento-table.component';

@NgModule({
  imports: [SharedModule],
  exports: [TipoDocumentoTableComponent],
  declarations: [TipoDocumentoTableComponent]
})
export class TipoDocumentoTableModule {}
