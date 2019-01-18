import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ApiConfig } from 'app/config/api.config';
import { FunctionService } from '@shared/service/function.service';

@Component({
  selector: 'chart-statistic',
  templateUrl: './statistic.component.html',
})
export class ChartStatisticComponent implements OnInit {
  profit_r_val: Date = new Date();
  profit_r_loading: boolean = true;
  profit_r_options: any;

  profit_p_val: Date = new Date();
  profit_p_loading: boolean = true;
  profit_p_options: any;

  constructor(
    private http: _HttpClient,
    private apiConfig: ApiConfig,
    private func: FunctionService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    this.changeProfitR();
    this.changeProfitP();
  }

  changeProfitR() {
    this.profit_r_loading = true;
    this.http.get(this.apiConfig.urls.chart.profitR, { year: this.profit_r_val.getFullYear() })
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.setProfitROptions(res.data);
          this.profit_r_loading = false;
          this.cd.detectChanges();
        }
      });
  }

  setProfitROptions(data) {
    const legendData = data.map(item => item.room.name);
    const seriesData = data.map(item => ({ name: item.room.name, type: 'line', data: item.profit }));
    this.profit_r_options = {
      color: ['#67E0E3', '#FFDB5C', '#1890FF', '#35AC84', '#FF9F7F', '#E7BCF3', '#9D96F5', '#96BFFF'],
      tooltip: {
        trigger: 'axis',
        formatter: '{a0}: {c0}'
      },
      legend: {
        data: legendData
      },
      xAxis: [
        {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: seriesData
    };
  }

  changeProfitP() {
    this.profit_p_loading = true;
    this.http.get(this.apiConfig.urls.chart.profitP, { year: this.profit_p_val.getFullYear() })
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.setProfitPOptions(res.data);
          this.profit_p_loading = false;
          this.cd.detectChanges();
        }
      });
  }

  setProfitPOptions(data) {
    const legendData = data.map(item => item.platform.name);
    const seriesData = data.map(item => ({ name: item.platform.name, type: 'line', data: item.profit }));
    this.profit_p_options = {
      color: ['#67E0E3', '#FFDB5C', '#1890FF', '#35AC84', '#FF9F7F', '#E7BCF3', '#9D96F5', '#96BFFF'],
      tooltip: {
        trigger: 'axis',
        formatter: '{a0}: {c0}'
      },
      legend: {
        data: legendData
      },
      xAxis: [
        {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: seriesData
    };
  }


}
