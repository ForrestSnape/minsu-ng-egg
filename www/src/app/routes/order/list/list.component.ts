import { Component, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { STComponent, STColumn, STChange, STPage, STData } from '@delon/abc';
import { _HttpClient } from '@delon/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'order-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent {
  // 表格
  @ViewChild('st')
  private st: STComponent;
  // 表格数据
  orders: STData[] = [];
  // 总条数
  total: number = 0;
  // 加载样式
  loading: boolean = true;
  // 当前页数
  pi: number = Number(localStorage.getItem('order_list_pi')) > 0 ? Number(localStorage.getItem('order_list_pi')) : 1;
  // 每页条数
  ps: number = 12;
  // 表格字段
  columns: STColumn[] = [
    { title: '订单ID', index: 'id', },
    { title: '房间', index: 'room.name' },
    { title: '平台', index: 'platform.name' },
    { title: '开始', index: 'begin', type: 'date', dateFormat: 'YYYY-MM-DD' },
    { title: '结束', index: 'end', type: 'date', dateFormat: 'YYYY-MM-DD' },
    { title: '天数', index: 'days', type: 'number' },
    { title: '总价', index: 'total_price', type: 'currency' },
    { title: '扣除', index: 'deduct_price', type: 'currency' },
    { title: '利润', index: 'profit_price', type: 'currency' },
    {
      title: '操作',
      buttons: [
        {
          text: '查看',
          click: (item: any) => this.router.navigateByUrl(`/order/detail/${item.id}`),
        },
        {
          text: '编辑',
          click: (item: any) => this.router.navigateByUrl(`/order/edit/${item.id}`),
        },
        {
          text: '删除',
          type: 'del',
          click: (item: any) => this.delOrder(item),
        },
      ],
    },
  ];
  // 分页设置
  page: STPage = {
    front: false
  };

  // 房间列表
  rooms: any;
  room_id: number;
  // 平台列表
  platforms: any;
  platform_id: number;

  pickerDate: Date[];
  // 开始日期
  begin: number;
  // 结束日期
  end: number;

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.getOrders();
    this.getRooms();
    this.getPlatforms();
  }

  selectDate() {
    this.begin = Math.round(this.pickerDate[0].getTime() / 1000);
    this.end = Math.round(this.pickerDate[1].getTime() / 1000);
  }

  getRooms() {
    this.http.get('http://localhost:7001/room/list')
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.rooms = res.data;
          this.cd.detectChanges();
        }
      });
  }

  selectRoom(room_id) {
    this.room_id = room_id;
  }

  getPlatforms() {
    this.http.get('http://localhost:7001/platform/list')
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.platforms = res.data;
          this.cd.detectChanges();
        }
      });
  }

  selectPlatform(platform_id) {
    this.platform_id = platform_id;
  }

  getOrders() {
    this.loading = true;
    this.http.get('http://localhost:7001/order/list', { pi: this.pi, ps: this.ps, begin: this.begin, end: this.end, room_id: this.room_id, platform_id: this.platform_id })
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.orders = res.data.orders;
          this.total = res.data.total;
          this.cd.detectChanges();
          this.loading = false;
        }
      });
  }

  _click(e: STChange) {
    if (e.type === 'pi') {
      this.pi = e.pi;
      // localStorage保存当前页码
      localStorage.setItem('order_list_pi', String(this.pi));
      this.getOrders();
    }
  }

  doSearch() {
    this.pi = 1;
    this.getOrders();
  }

  doReset() {
    this.pi = 1;
    let room_id: number;
    this.room_id = room_id;
    let platform_id: number;
    this.platform_id = platform_id;
    let pickerDate: Date[];
    this.pickerDate = pickerDate;
    let begin: number;
    this.begin = begin;
    let end: number;
    this.end = end;
    this.getOrders();
  }

  addOrder() {
    this.router.navigateByUrl(`/order/add`);
  }

  delOrder(order) {
    this.http.post('http://localhost:7001/order/delete', { order_id: order.id })
      .subscribe((res: any) => {
        if (res.code === 0) {
          if (res.data) {
            this.msg.success('删除订单成功，2秒后刷新', { nzDuration: 2000 });
            setTimeout(() => this.getOrders(), 2500);
          } else {
            this.msg.warning('删除订单失败')
          };
        }
      });
  }

}
