import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ActivatedRoute } from '@angular/router';
import { STComponent, STData, STPage, STColumn } from '@delon/abc';

@Component({
  selector: 'order-detail',
  templateUrl: './detail.component.html',
})
export class OrderDetailComponent implements OnInit {
  order_id: number;
  order: any;

  // 日期-金额表格
  @ViewChild('st')
  private st: STComponent;
  // 表格数据
  order_date_price: STData[] = [];
  // 表格字段
  columns: STColumn[] = [
    { title: '开始', index: 'begin', type: 'date', dateFormat: 'YYYY-MM-DD' },
    { title: '结束', index: 'end', type: 'date', dateFormat: 'YYYY-MM-DD' },
    { title: '金额', index: 'price', type: 'currency' },
  ];
  // 分页设置
  page: STPage = {
    show: false
  };

  // 评论星级
  stars: any = [];

  loading: boolean = true;

  constructor(
    private http: _HttpClient,
    private ar: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
    this.order_id = this.ar.snapshot.params.order_id;
    this.getOrderDetail();
  }

  getOrderDetail() {
    this.http.get('http://localhost:7001/order/detail', { order_id: this.order_id })
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.order = res.data;
          this.order_date_price = this.order.order_date_prices;
          // 评论星级
          if (this.order.comment) {
            this.stars = this.getStars(this.order.comment.star);
          }
          this.loading = false;
          this.cd.detectChanges();
        }
      });
  }

  getStars(star) {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= star);
    }
    return stars;
  }

}
