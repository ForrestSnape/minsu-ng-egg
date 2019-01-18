import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartRoomComponent } from './room/room.component';
import { ChartStatisticComponent } from './statistic/statistic.component';

const routes: Routes = [
  { path: '', redirectTo: 'room', pathMatch: 'full' },
  { path: 'room', component: ChartRoomComponent },
  { path: 'statistic', component: ChartStatisticComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartRoutingModule { }
