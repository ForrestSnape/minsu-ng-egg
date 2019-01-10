import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { IndustryRoutingModule } from './industry-routing.module';
import { IndustryListComponent } from './list/list.component';
import { IndustryAddComponent } from './add/add.component';
import { IndustryEditComponent } from './edit/edit.component';

const COMPONENTS = [
  IndustryListComponent,
  IndustryAddComponent,
  IndustryEditComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    IndustryRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class IndustryModule { }
