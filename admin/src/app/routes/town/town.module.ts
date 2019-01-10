import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TownRoutingModule } from './town-routing.module';
import { TownListComponent } from './list/list.component';
import { TownAddComponent } from './add/add.component';
import { IndustryModule } from '../industry/industry.module';

const COMPONENTS = [
  TownListComponent,
  TownAddComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    TownRoutingModule,
    IndustryModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class TownModule { }
