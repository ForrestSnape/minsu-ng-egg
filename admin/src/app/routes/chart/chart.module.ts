import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartRoutingModule } from './chart-routing.module';
import { ChartRoomComponent } from './room/room.component';
import { ChartStatisticComponent } from './statistic/statistic.component';

const COMPONENTS = [
  ChartRoomComponent,
  ChartStatisticComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    ChartRoutingModule,
    NgxEchartsModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class ChartModule { }
