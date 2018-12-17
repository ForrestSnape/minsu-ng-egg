import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PlatformRoutingModule } from './platform-routing.module';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    PlatformRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class PlatformModule { }
