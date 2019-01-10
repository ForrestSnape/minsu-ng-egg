import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndustryListComponent } from './list/list.component';
import { IndustryAddComponent } from './add/add.component';
import { IndustryEditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: IndustryListComponent },
  { path: 'add', component: IndustryAddComponent },
  { path: 'edit/:industry_id', component: IndustryEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndustryRoutingModule { }
