import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRoleComponent } from './role/role.component';
import { UserAdminUserListComponent } from './admin-user/list/list.component';
import { UserAdminUserAddComponent } from './admin-user/add/add.component';
import { UserAdminUserEditComponent } from './admin-user/edit/edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin-user/list', pathMatch: 'full' },
  { path: 'admin-user', redirectTo: 'admin-user/list', pathMatch: 'full' },
  { path: 'admin-user/list', component: UserAdminUserListComponent },
  { path: 'admin-user/add', component: UserAdminUserAddComponent },
  { path: 'admin-user/edit/:uid', component: UserAdminUserEditComponent },
  { path: 'role', redirectTo: 'role/list', pathMatch: 'full' },
  { path: 'role/list', component: UserRoleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
