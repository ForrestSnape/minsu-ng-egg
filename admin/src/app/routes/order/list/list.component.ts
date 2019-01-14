import { Component, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { STComponent, STColumn, STChange, STPage, STData, STColumnTag } from '@delon/abc';
import { _HttpClient } from '@delon/theme';
import { Router } from '@angular/router';
import { ApiConfig } from 'app/config/api.config';
import { FunctionService } from '@shared/service/function.service';

const STATUS: STColumnTag = {
  1: { text: '已完成', color: 'blue' },
  2: { text: '入住中', color: 'green' },
  3: { text: '待入住', color: 'orange' }
};

@Component({
  selector: 'order-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent {
  rooms: Array<any>;
  room_id: number;
  platforms: Array<any>;
  platform_id: number;
  date_range: Array<Date> = [];
  order_by: any;
  selectedRows: Array<number> = [];

  // 表格
  @ViewChild('st')
  private st: STComponent;
  // 表格数据
  orders: STData[];
  // 总条数
  total: number = 0;
  // 加载样式
  loading: boolean = true;
  // 当前页数
  pi: number = Number(localStorage.getItem('orderlist_pi')) > 0 ? Number(localStorage.getItem('orderlist_pi')) : 1;
  // 每页条数
  ps: number = 10;

  // 表格字段
  columns: STColumn[] = [
    {
      title: '订单ID',
      index: 'id',
      type: 'checkbox',
      selections: [
        {
          text: '已完成',
          select: (data: any[]) =>
            data.forEach(item => (item.checked = item.status == 1)),
        },
        {
          text: '入住中',
          select: (data: any[]) =>
            data.forEach(item => (item.checked = item.status == 2)),
        },
        {
          text: '待入住',
          select: (data: any[]) =>
            data.forEach(item => (item.checked = item.status == 3)),
        }
      ],
    },
    { title: '开始', index: 'begin', type: 'date', dateFormat: 'YYYY-MM-DD', sort: true, className: 'text-center' },
    { title: '结束', index: 'end', type: 'date', dateFormat: 'YYYY-MM-DD', className: 'text-center' },
    { title: '天数', index: 'days', type: 'number', sort: true, className: 'text-center' },
    { title: '房间', index: 'room.name', className: 'text-center' },
    { title: '平台', index: 'platform.name', className: 'text-center' },
    { title: '总价', index: 'total', type: 'currency', sort: true, className: 'text-center' },
    { title: '扣除', index: 'deduct', type: 'currency', className: 'text-center' },
    { title: '利润', index: 'profit', type: 'currency', sort: true, className: 'text-center' },
    { title: '状态', index: 'status', type: 'tag', tag: STATUS, className: 'text-left' },
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
          click: (item: any) => this.delOrder(item.id),
        },
      ],
      className: 'text-center'
    },
  ];
  // 分页设置
  page: STPage = {
    front: false
  };

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private apiConfig: ApiConfig,
    private func: FunctionService,
  ) { }

  ngOnInit(): void {
    this.getRooms();
    this.getPlatforms();
    this.getOrders();
  }

  getRooms() {
    this.http.get(this.apiConfig.urls.room.list)
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.rooms = res.data;
        }
      });
  }

  getPlatforms() {
    this.http.get(this.apiConfig.urls.platform.list)
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.platforms = res.data;
        }
      });
  }

  getOrders() {
    this.loading = true;
    const date_range = this.date_range.map(date => Math.round(this.func.getCurDayWithTime(date, '14:00:00').getTime() / 1000));
    const params = {
      pi: this.pi,
      ps: this.ps,
      begin: date_range[0] ? date_range[0] : 0,
      end: date_range[1] ? date_range[1] : 0,
      room_id: this.room_id ? this.room_id : 0,
      platform_id: this.platform_id ? this.platform_id : 0,
      order_by: this.order_by ? this.order_by : 'begin,desc'
    };
    this.http.get(this.apiConfig.urls.order.list, params)
      .subscribe((res: any) => {
        this.loading = false;
        if (res.code === 0) {
          this.orders = res.data.orders;
          this.total = res.data.total;
          this.cd.detectChanges();
        }
      });
  }

  // 点击动作 分页、排序等
  _click(e: STChange): void {
    if (e.type === 'checkbox') {
      this.selectedRows = e.checkbox.map(item => item.id);
    }
    if (e.type === 'pi') {
      this.pi = e.pi;
      this.reloadListData();
    }
    if (e.type === 'sort') {
      if (e.sort.value) {
        this.order_by = e.sort.column.index[0] + ',' + (e.sort.value === 'descend' ? 'desc' : 'asc');
      } else {
        this.order_by = '';
      }
      this.pi = 1;
      this.reloadListData();
    }
  }

  // 搜索
  doSearch() {
    this.pi = 1;
    this.reloadListData();
  }

  // 重置
  doReset() {
    let date_range: Array<Date> = [];
    let room_id: number;
    let platform_id: number;
    let order_by: string;
    this.date_range = date_range;
    this.room_id = room_id;
    this.platform_id = platform_id;
    this.order_by = order_by;
    this.pi = 1;
    this.reloadListData();
  }



  // 重新加载列表数据
  reloadListData() {
    localStorage.setItem('orderlist_pi', String(this.pi));
    this.getOrders();
  }


  addOrder(): void {
    this.router.navigateByUrl('/order/add');
  }

  delOrder(id): void {
    this.loading = true;
    this.http.delete(this.apiConfig.urls.order.del, { id: id })
      .subscribe((res: any) => {
        if (res.code === 0) {
          if (res.data) {
            this.msg.success('删除订单成功', { nzDuration: 2000 });
            setTimeout(() => this.reloadListData(), 2500);
          } else {
            this.msg.warning('删除订单失败', { nzDuration: 2000 });
            setTimeout(() => this.reloadListData(), 2500);
          };
        }
      });
  }

  // 批量操作
  // type 1删除
  batch(type) {
    const type_name = type === 1 ? '删除' : '删除';
    this.loading = true;
    this.http.post(this.apiConfig.urls.order.batch, { ids: this.selectedRows, type: type })
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.selectedRows = [];
          this.msg.success(`批量${type_name}成功`, { nzDuration: 2000 });
          setTimeout(() => this.reloadListData(), 2500);
        } else if (res.code === 1) {
          this.selectedRows = [];
          this.msg.success(res.msg, { nzDuration: 2000 });
          setTimeout(() => this.reloadListData(), 2500);
        }
      });
  }
}
