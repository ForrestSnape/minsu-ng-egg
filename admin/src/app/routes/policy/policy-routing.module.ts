import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PolicyListComponent } from './list/list.component';
import { PolicyAddComponent } from './add/add.component';
import { PolicyEditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: PolicyListComponent },
  { path: 'add', component: PolicyAddComponent },
  { path: 'edit/:policy_id', component: PolicyEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyRoutingModule { }
