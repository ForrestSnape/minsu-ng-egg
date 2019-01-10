import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient, SettingsService } from '@delon/theme';
import { FunctionService } from '@shared/service/function.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiConfig } from 'app/config/api.config';

@Component({
  selector: 'order-edit',
  templateUrl: './edit.component.html',
})
export class OrderEditComponent implements OnInit {
  user_id: number;
  id: number;
  order: any;
  rooms: any;
  room_id: number;
  platforms: any;
  platform_id: number;
  date_range: Array<Date> = [];
  dates = [];
  date_price = [];
  total: number = 0;
  deduct: number = 0;
  profit: number = 0;

  form: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private http: _HttpClient,
    private cd: ChangeDetectorRef,
    private func: FunctionService,
    private router: Router,
    private apiConfig: ApiConfig,
    private settings: SettingsService,
    private ar: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.user_id = this.settings.user.id;
    this.id = this.ar.snapshot.params.id;
    this.initForm();
    this.getOrder();
    this.getRooms();
    this.getPlatforms();

  }

  initForm() {
    this.form = this.fb.group({
      room_id: [null, [Validators.required]],
      platform_id: [null, [Validators.required]],
      date_range: [null, [Validators.required]],
      total: [null, [Validators.required]],
      deduct: [null, [Validators.required]],
      profit: [null, [Validators.required]],
    });
  }

  getOrder() {
    this.http.get(this.apiConfig.urls.order.detail, { id: this.id })
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.order = res.data;
          this.dates = this.func.getDateList(new Date(this.order.begin), new Date(this.order.end));
          this.date_price = this.order.order_date_prices.map((item, i) => ({ ...item, name: `date_price_${i}` }));
          const patchValues = {
            room_id: String(this.order.room_id),
            platform_id: String(this.order.platform_id),
            date_range: [new Date(this.order.begin), new Date(this.order.end)],
            total: this.order.total,
            deduct: this.order.deduct,
            profit: this.order.profit
          };
          this.date_price.forEach(item => {
            // 表单添加字段
            this.form.addControl(item.name, new FormControl());
            // 给新加的字段赋值
            patchValues[item.name] = item.price;
          })
          this.form.patchValue(patchValues)
        }
      });
  }

  getRooms() {
    this.http.get(this.apiConfig.urls.room.list, { user_id: this.user_id })
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

  selectDate(date_range) {
    if (date_range.length > 0) {
      let dates = this.func.getDateList(date_range[0], date_range[1]);
      let dates_str = dates.map(item => (item.getMonth() + 1) + '月' + item.getDate() + '日');
      let res = [];
      dates_str.reduce((x, y) => {
        res.push(x + ' 到 ' + y);
        return y;
      })
      this.dates = res;
      // date_price增加内容 [0:{begin, end}]
      // 表单增加 date_price_0
      this.date_price = [];
      for (let i = 0; i < dates.length - 1; i++) {
        this.date_price[i] = {
          name: `date_price_${i}`,
          // 开始时间 下午2点
          begin: this.func.getTimeStampByDate(dates[i], '14:00:00', 's'),
          // 结束时间 中午12点
          end: this.func.getTimeStampByDate(dates[i + 1], '12:00:00', 's'),
          price: 0
        }
        this.form.addControl(`date_price_${i}`, new FormControl());
      }
      this.cd.detectChanges();
    }
  }

  datePriceChange() {
    let total: number = 0;
    this.date_price.map(item => {
      total += Number(item.price);
    })
    this.total = total;
  }

  totalPriceChange() {
    this.profit = this.total - this.deduct;
  }

  deductPriceChange() {
    this.profit = this.total - this.deduct;
  }

  submit(form) {
    this.submitting = true;
    const params = form.value;
    params.user_id = this.user_id;
    params.id = this.id;
    params.date_price = this.date_price;
    params.begin = this.func.getTimeStampByDate(form.value.date_range[0], '14:00:00', 's');
    params.end = this.func.getTimeStampByDate(form.value.date_range[1], '12:00:00', 's');
    params.days = this.date_price.length;
    this.http.post(this.apiConfig.urls.order.edit, params)
      .subscribe((res: any) => {
        if (res.code === 0) {
          if (res.data) {
            this.msg.success('编辑订单成功', { nzDuration: 2000 });
            setTimeout(() => this.router.navigateByUrl(`/order/list`), 2500);
          } else {
            this.msg.warning('编辑订单失败', { nzDuration: 2000 });
            setTimeout(() => this.router.navigateByUrl(`/order/list`), 2500);
          };
        }
      });
  }

}
