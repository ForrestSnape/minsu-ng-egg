import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './list/list.component';
import { OrderAddComponent } from './add/add.component';
import { OrderEditComponent } from './edit/edit.component';
import { OrderDetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: OrderListComponent },
  { path: 'add', component: OrderAddComponent },
  { path: 'edit/:id', component: OrderEditComponent },
  { path: 'detail/:id', component: OrderDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
