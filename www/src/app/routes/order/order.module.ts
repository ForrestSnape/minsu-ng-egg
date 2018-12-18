import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './list/list.component';
import { OrderAddComponent } from './add/add.component';
import { OrderDetailComponent } from './detail/detail.component';
import { OrderEditComponent } from './edit/edit.component';

const COMPONENTS = [
  OrderListComponent,
  OrderAddComponent,
  OrderDetailComponent,
  OrderEditComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    OrderRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class OrderModule { }
