import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { FunctionService } from '@shared/service/function.service';
import { Router } from '@angular/router';

@Component({
  selector: 'order-add',
  templateUrl: './add.component.html',
})
export class OrderAddComponent implements OnInit {
  // 房间列表
  rooms: any;
  room_id: number;
  // 平台列表
  platforms: any;
  platform_id: number;
  // 日期
  date_range: Date[] = [];
  // 单天数组
  dates = [];
  // 单天价格
  date_price = [];
  // 总价
  total_price: number = 0;
  // 扣除费用
  deduct_price: number = 0;
  // 利润
  profit_price: number = 0;

  form: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private http: _HttpClient,
    private cd: ChangeDetectorRef,
    private fs: FunctionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRooms();
    this.getPlatforms();
    this.form = this.fb.group({
      room_id: [null, [Validators.required]],
      platform_id: [null, [Validators.required]],
      date_range: [null, [Validators.required]],
      total_price: [null, [Validators.required]],
      deduct_price: [null, [Validators.required]],
      profit_price: [null, [Validators.required]],
    });
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

  getPlatforms() {
    this.http.get('http://localhost:7001/platform/list')
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.platforms = res.data;
          this.cd.detectChanges();
        }
      });
  }

  selectDate(date_range) {
    if (date_range.length > 0) {
      let dates = this.fs.getDateList(date_range[0], date_range[1]);
      let dates_str = dates.map(item => (item.getMonth() + 1) + '月' + item.getDate() + '日');
      let res = [];
      dates_str.reduce((x, y) => {
        res.push(x + ' 到 ' + y);
        return y;
      })
      this.dates = res;
      // date_price增加内容 [0:{begin, end}]
      // 表单增加 date_price_0
      for (let i = 0; i < dates.length - 1; i++) {
        this.date_price[i] = {
          name: `date_price_${i}`,
          // 开始时间 下午3点
          begin: this.fs.getTimeStampByDate(dates[i], '15:00:00', 's'),
          // 结束时间 中午12点
          end: this.fs.getTimeStampByDate(dates[i + 1], '12:00:00', 's'),
          price: 0
        }
        this.form.addControl(`date_price_${i}`, new FormControl());
      }
      this.cd.detectChanges();
    }
  }

  datePriceChange() {
    let total_price: number = 0;
    this.date_price.map(item => {
      total_price += Number(item.price);
    })
    this.total_price = total_price;
    this.cd.detectChanges();
  }

  totalPriceChange() {
    this.profit_price = this.total_price - this.deduct_price;
    this.cd.detectChanges();
  }

  deductPriceChange() {
    this.profit_price = this.total_price - this.deduct_price;
    this.cd.detectChanges();
  }

  submit(form) {
    this.submitting = true;
    form.value['date_price'] = this.date_price;
    form.value['begin'] = this.fs.getTimeStampByDate(form.value.date_range[0], '15:00:00', 's');
    form.value['end'] = this.fs.getTimeStampByDate(form.value.date_range[1], '12:00:00', 's');
    form.value['days'] = this.date_price.length;
    this.addOrder(form.value);
  }

  addOrder(params) {
    this.http.post('http://localhost:7001/order/add', params)
      .subscribe((res: any) => {
        if (res.code === 0) {
          if (res.data) {
            this.msg.success('添加订单成功，2秒后跳转到列表页', { nzDuration: 2000 });
            setTimeout(() => this.router.navigateByUrl(`/order/list`), 2500);
          } else {
            this.msg.warning('添加订单失败')
          };
        }
      });
  }

  backToList() {
    this.router.navigateByUrl('/order/list');
  }

}
