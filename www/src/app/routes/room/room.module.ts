import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RoomRoutingModule } from './room-routing.module';
import { RoomListComponent } from './list/list.component';

const COMPONENTS = [
  RoomListComponent];
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
