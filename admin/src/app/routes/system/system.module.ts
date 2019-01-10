import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { SystemModuleComponent } from './module/module.component';

const COMPONENTS = [
  SystemModuleComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    SystemRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class SystemModule { }
