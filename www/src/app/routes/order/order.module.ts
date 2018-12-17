import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './list/list.component';

const COMPONENTS = [
  OrderListComponent];
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
