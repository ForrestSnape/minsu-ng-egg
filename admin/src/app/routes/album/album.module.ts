import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AlbumRoutingModule } from './album-routing.module';
import { AlbumListComponent } from './list/list.component';
import { AlbumAddComponent } from './add/add.component';
import { AlbumEditComponent } from './edit/edit.component';
import { AlbumImageComponent } from './image/image.component';

const COMPONENTS = [
  AlbumListComponent,
  AlbumAddComponent,
  AlbumEditComponent,
  AlbumImageComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    AlbumRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class AlbumModule { }
