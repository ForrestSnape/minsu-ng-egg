import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './list/list.component';
import { OrderAddComponent } from './add/add.component';
import { OrderDetailComponent } from './detail/detail.component';
import { OrderEditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'list', component: OrderListComponent },
  { path: 'add', component: OrderAddComponent },
  { path: 'detail/:order_id', component: OrderDetailComponent },
  { path: 'edit', component: OrderEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OrderRoutingModule { }
