import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RoomRoutingModule } from './room-routing.module';
import { RoomListComponent } from './list/list.component';
import { RoomAddComponent } from './add/add.component';
import { RoomEditComponent } from './edit/edit.component';

const COMPONENTS = [
  RoomListComponent,
  RoomAddComponent,
  RoomEditComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    RoomRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class RoomModule { }
