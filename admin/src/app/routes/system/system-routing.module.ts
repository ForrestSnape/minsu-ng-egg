import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemModuleComponent } from './module/module.component';

const routes: Routes = [
  { path: '', redirectTo: 'module/list', pathMatch: 'full' },
  { path: 'module', redirectTo: 'module/list', pathMatch: 'full' },
  { path: 'module/list', component: SystemModuleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
