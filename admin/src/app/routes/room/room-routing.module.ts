import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomListComponent } from './list/list.component';
import { RoomAddComponent } from './add/add.component';
import { RoomEditComponent } from './edit/edit.component';

const routes: Routes = [

  { path: 'list', component: RoomListComponent },
  { path: 'add', component: RoomAddComponent },
  { path: 'edit/:id', component: RoomEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
