import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartRoomComponent } from './room/room.component';

const routes: Routes = [
  { path: '', redirectTo: 'room', pathMatch: 'full' },
  { path: 'room', component: ChartRoomComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartRoutingModule { }
