import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { _HttpClient, ScrollService } from '@delon/theme';

@Component({
  selector: 'room-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomListComponent implements OnInit {
  orders: any;
  s = {
    q: '',
    pi: 1,
    ps: 9,
  };
  total = 0;
  list: any[];
  constructor(
    private http: _HttpClient,
    private cd: ChangeDetectorRef,
    private scrollSrv: ScrollService,
  ) { }

  ngOnInit() {
    // this.load(1);
    this.getOrders();
  }

  getOrders() {
    this.http.get('http://localhost:7001/order/list', { begin: 1544150000, end: 0, room_id: 1, platform_id: 0 })
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.orders = res.orders;
        }
      });
  }

  load(pi = 1) {
    this.s.pi = pi;
    this.http.get('/course', this.s).subscribe((res: any) => {
      this.list = res.list;
      this.total = res.total;
      this.scrollSrv.scrollToTop();
      this.cd.detectChanges();
    });
  }
}
