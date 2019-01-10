import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserRoleComponent } from './role/role.component';
import { UserAdminUserListComponent } from './admin-user/list/list.component';
import { UserAdminUserAddComponent } from './admin-user/add/add.component';
import { UserAdminUserEditComponent } from './admin-user/edit/edit.component';

const COMPONENTS = [
  UserRoleComponent,
  UserAdminUserListComponent,
  UserAdminUserAddComponent,
  UserAdminUserEditComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class UserModule { }
