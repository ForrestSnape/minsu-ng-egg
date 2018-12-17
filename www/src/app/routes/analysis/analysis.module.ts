import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AnalysisRoutingModule } from './analysis-routing.module';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    AnalysisRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class AnalysisModule { }
