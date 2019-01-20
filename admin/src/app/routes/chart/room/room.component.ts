import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ApiConfig } from 'app/config/api.config';
import { FunctionService } from '@shared/service/function.service';

@Component({
  selector: 'chart-room',
  templateUrl: './room.component.html',
})
export class ChartRoomComponent implements OnInit {
  order_m_val: Date = new Date();
  order_m_loading: boolean = true;
  order_m_options: any;

  platform_m_val: Date = new Date();
  platform_m_loading: boolean = true;
  platform_m_options: any;

  order_y_val: Date = new Date();
  order_y_loading: boolean = true;
  order_y_options: any;

  platform_y_val: Date = new Date();
  platform_y_loading: boolean = true;
  platform_y_options: any;

  rooms: any;
  pos: number = 0;
  cur_room_id: number;

  constructor(
    private http: _HttpClient,
    private apiConfig: ApiConfig,
    private func: FunctionService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getRooms();
  }

  getRooms() {
    this.http.get(this.apiConfig.urls.room.list)
      .subscribe((res: any) => {
        this.rooms = res;
        this.cur_room_id = this.rooms[0].id;
        this.changeRoom(this.cur_room_id);
      });
  }

  changeRoom(id) {
    this.cur_room_id = id;
    this.rooms.forEach((room, i) => {
      if (room.id === id) this.pos = i;
    })
    this.initChart();
  }

  initChart() {
    this.changeOrderM();
    this.changePlatformM();
    this.changeOrderY();
    this.changePlatformY();
  }

  changeOrderM() {
    this.order_m_loading = true;
    const { begin, end } = this.func.getTimestampByType(this.order_m_val, 'month');
    this.http.get(this.apiConfig.urls.chart.orderM, { room_id: this.cur_room_id, begin: begin, end: end })
      .subscribe((res: any) => {
        this.order_m_loading = false;
        this.setOrderMOptions(res);
        this.order_m_loading = false;
        this.cd.detectChanges();
      });
  }

  setOrderMOptions(orders) {
    const xAxisData = orders.map((order, i) => i + 1);
    const seriesData = { date: [], days: [], total: [], profit: [] };
    orders.forEach(order => {
      seriesData.date.push(`${new Date(order.begin).getDate()}号到${new Date(order.end).getDate()}号`);
      seriesData.days.push(order.days);
      seriesData.total.push(order.total);
      seriesData.profit.push(order.profit);
    });
    this.order_m_options = {
      color: ['#67E0E3', '#FFDB5C', '#1890FF', '#35AC84', '#FF9F7F', '#E7BCF3', '#9D96F5', '#96BFFF'],
      tooltip: {
        trigger: 'axis',
        formatter: '{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}<br />{a3}: {c3}'
      },
      legend: {
        data: ['订单日期', '订单天数', '订单金额', '利润金额']
      },
      grid: {
        top: '12%',
        left: '1%',
        right: '10%',
        containLabel: true
      },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          data: xAxisData,
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '订单日期',
          type: 'bar',
          data: seriesData.date
        },
        {
          name: '订单天数',
          type: 'bar',
          data: seriesData.days
        },
        {
          name: '订单金额',
          type: 'bar',
          data: seriesData.total
        },
        {
          name: '利润金额',
          type: 'bar',
          data: seriesData.profit
        }
      ]
    };
  }

  changePlatformM() {
    this.platform_m_loading = true;
    const { begin, end } = this.func.getTimestampByType(this.platform_m_val, 'month');
    this.http.get(this.apiConfig.urls.chart.platformMY, { room_id: this.cur_room_id, begin: begin, end: end })
      .subscribe((res: any) => {
        this.platform_m_loading = false;
        this.setPlatformMOptions(res);
        this.platform_m_loading = false;
        this.cd.detectChanges();
      });
  }

  setPlatformMOptions(seriesData) {
    this.platform_m_options = {
      color: ['#1890FF', '#35AC84', '#67E0E3', '#FFDB5C', '#FF9F7F', '#E7BCF3', '#9D96F5', '#96BFFF'],
      tooltip: {
        trigger: 'item',
        formatter: "{b} <br/>{c} 笔订单 ({d}%)"
      },
      legend: {
        data: seriesData.map(item => item.name)
      },
      series: [
        {
          name: '订单来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }

  changeOrderY() {
    this.order_y_loading = true;
    const year = this.order_y_val.getFullYear();
    this.http.get(this.apiConfig.urls.chart.orderY, { room_id: this.cur_room_id, year: year })
      .subscribe((res: any) => {
        this.order_y_loading = false;
        this.setOrderYOptions(res);
        this.order_y_loading = false;
        this.cd.detectChanges();
      });
  }

  setOrderYOptions(seriesData) {
    this.order_y_options = {
      color: ['#67E0E3', '#FFDB5C', '#1890FF', '#35AC84', '#FF9F7F', '#E7BCF3', '#9D96F5', '#96BFFF'],
      tooltip: {
        trigger: 'axis',
        formatter: '{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}<br />{a3}: {c3}'
      },
      legend: {
        data: ['订单数', '天数', '订单金额', '利润金额']
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
      series: [
        {
          name: '订单数',
          type: 'line',
          data: seriesData.num
        },
        {
          name: '天数',
          type: 'line',
          data: seriesData.days
        },
        {
          name: '订单金额',
          type: 'line',
          data: seriesData.total
        },
        {
          name: '利润金额',
          type: 'line',
          data: seriesData.profit
        },
      ]
    };
  }

  changePlatformY() {
    this.platform_y_loading = true;
    const { begin, end } = this.func.getTimestampByType(this.platform_y_val, 'year');
    this.http.get(this.apiConfig.urls.chart.platformMY, { room_id: this.cur_room_id, begin: begin, end: end })
      .subscribe((res: any) => {
        this.platform_y_loading = false;
        this.setPlatformYOptions(res);
        this.platform_y_loading = false;
        this.cd.detectChanges();
      });
  }

  setPlatformYOptions(seriesData) {
    this.platform_y_options = {
      color: ['#1890FF', '#35AC84', '#67E0E3', '#FFDB5C', '#FF9F7F', '#E7BCF3', '#9D96F5', '#96BFFF'],
      tooltip: {
        trigger: 'item',
        formatter: "{b} <br/>{c} 笔订单 ({d}%)"
      },
      legend: {
        data: seriesData.map(item => item.name)
      },
      series: [
        {
          name: '订单来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }
}
