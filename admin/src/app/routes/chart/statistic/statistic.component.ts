import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ApiConfig } from 'app/config/api.config';
import { FunctionService } from '@shared/service/function.service';
import { STData, STComponent, STColumn, STPage } from '@delon/abc';

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

  room_platform_val: Date = new Date();
  room_platform_select_type: string = 'month';
  room_platform_loading: boolean = true;
  @ViewChild('r_p_st')
  private r_p_st: STComponent;
  room_platform_data: STData = [];
  room_platform_columns: STColumn[] = [{ title: '', index: '' }];

  room_order_val: Date = new Date();
  room_order_select_type: string = 'month';
  room_order_loading: boolean = true;
  @ViewChild('r_o_st')
  private r_o_st: STComponent;
  room_order_data: STData = [];
  room_order_columns: STColumn[] = [{ title: '', index: '' }];

  page: STPage = {
    show: false
  };

  constructor(
    private http: _HttpClient,
    private apiConfig: ApiConfig,
    private func: FunctionService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.initChart();
    this.getRoomPlatform();
    this.getRoomOrder();
  }

  initChart() {
    this.changeProfitR();
    this.changeProfitP();
  }

  changeProfitR() {
    this.profit_r_loading = true;
    this.http.get(this.apiConfig.urls.chart.profitR, { year: this.profit_r_val.getFullYear() })
      .subscribe((res: any) => {
        this.setProfitROptions(res);
        this.profit_r_loading = false;
        this.cd.detectChanges();
      });
  }

  setProfitROptions(data) {
    let tooltipFormatterData = '';
    for (let i = 0; i < data.length; i++) {
      tooltipFormatterData += `{a${i}}: {c${i}}<br>`;
    }
    const legendData = data.map(item => item.room.name);
    const seriesData = data.map(item => ({ name: item.room.name, type: 'line', data: item.profit }));
    this.profit_r_options = {
      color: ['#67E0E3', '#FFDB5C', '#1890FF', '#35AC84', '#FF9F7F', '#E7BCF3', '#9D96F5', '#96BFFF'],
      tooltip: {
        trigger: 'axis',
        formatter: tooltipFormatterData
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
        this.setProfitPOptions(res);
        this.profit_p_loading = false;
        this.cd.detectChanges();
      });
  }

  setProfitPOptions(data) {
    let tooltipFormatterData = '';
    for (let i = 0; i < data.length; i++) {
      tooltipFormatterData += `{a${i}}: {c${i}}<br>`;
    }
    const legendData = data.map(item => item.platform.name);
    const seriesData = data.map(item => ({ name: item.platform.name, type: 'line', data: item.profit }));
    this.profit_p_options = {
      color: ['#67E0E3', '#FFDB5C', '#1890FF', '#35AC84', '#FF9F7F', '#E7BCF3', '#9D96F5', '#96BFFF'],
      tooltip: {
        trigger: 'axis',
        formatter: tooltipFormatterData
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

  changeRPSType() {
    this.getRoomPlatform();
  }

  getRoomPlatform() {
    let params = {};
    switch (this.room_platform_select_type) {
      case 'month':
        params = this.func.getTimestampByType(this.room_platform_val, 'month');
        break;
      case 'year':
        params = this.func.getTimestampByType(this.room_platform_val, 'year');
        break;
      default:
        break;
    }
    this.http.get(this.apiConfig.urls.chart.roomPlatform, params)
      .subscribe((res: any) => {
        this.room_platform_data = res.data;
        this.room_platform_columns = res.columns;
      })
  }

  changeROSType() {
    this.getRoomOrder();
  }

  getRoomOrder() {
    let params = {};
    switch (this.room_order_select_type) {
      case 'month':
        params = this.func.getTimestampByType(this.room_order_val, 'month');
        break;
      case 'year':
        params = this.func.getTimestampByType(this.room_order_val, 'year');
        break;
      default:
        break;
    }
    this.http.get(this.apiConfig.urls.chart.roomOrder, params)
      .subscribe((res: any) => {
        this.room_order_data = res.data;
        this.room_order_columns = res.columns;
      })
  }

}
