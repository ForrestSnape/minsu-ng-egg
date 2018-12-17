import { Component, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { STComponent, STColumn, STChange, STPage, STData } from '@delon/abc';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-order-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent {
  @ViewChild('st')
  private st: STComponent;
  orders: STData[] = [];
  total: number = 0;
  loading: boolean = true;
  pi: number = 1;
  ps: number = 10;
  columns: STColumn[] = [
    {
      title: '订单ID',
      index: 'id',
      type: 'no'
    },
    { title: '时间', index: 'order' },
    { title: '房间', index: 'room.name' },
    { title: '平台', index: 'platform.name' },
    { title: '总价', index: 'total_price' },
    { title: '扣除', index: 'deduct_price' },
    { title: '利润', index: 'profit_price' },
    { title: '状态', index: 'profit_price' },
    { title: '客人', index: 'profit_price' },
    { title: '点评', index: 'profit_price' },
    { title: '操作', index: 'profit_price' },
  ];
  page: STPage = {
    front: false,
    total: true
  };

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.http.get('http://localhost:7001/order/list', { pi: this.pi, ps: this.ps, begin: 0, end: 0, room_id: 1, platform_id: 0 })
      .subscribe((res: any) => {
        this.orders = res.data.orders;
        this.total = res.data.total;
        this.cd.detectChanges();
        this.loading = false;
      });
  }

  _click(e: STChange) {
    if (e.type === 'pi') {
      this.loading = true;
      this.pi = e.pi;
      this.getOrders();
    }
  }

}
