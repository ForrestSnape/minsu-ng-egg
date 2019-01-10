import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TownListComponent } from './list/list.component';
import { TownAddComponent } from './add/add.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: TownListComponent },
  { path: 'add', component: TownAddComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TownRoutingModule { }
