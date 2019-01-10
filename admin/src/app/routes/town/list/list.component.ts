import { Component, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { STComponent, STColumn, STChange, STPage, STData } from '@delon/abc';
import { _HttpClient } from '@delon/theme';
import { Router } from '@angular/router';
import { ApiConfig } from 'app/config/api.config';

@Component({
  selector: 'town-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TownListComponent {
  citys: any;
  city_id: number;
  search_name: string;
  selectedRows: Array<number> = [];

  // 表格
  @ViewChild('st')
  private st: STComponent;
  // 表格数据
  towns: STData[] = [];
  // 总条数
  total: number = 0;
  // 加载样式
  loading: boolean = true;
  // 当前页数
  pi: number = Number(localStorage.getItem('townlist_pi')) > 0 ? Number(localStorage.getItem('townlist_pi')) : 1;
  // 每页条数
  ps: number = 10;
  // 表格字段
  columns: STColumn[] = [
    { title: '小镇ID', index: 'town_id', type: 'checkbox' },
    { title: '小镇名称', index: 'town_name', className: 'text-center' },
    { title: '所在城市', index: 'city.city_name', className: 'text-center' },
    { title: '规划面积', index: 'townExtend.land_area', className: 'text-center' },
    { title: '建设面积', index: 'townExtend.build_area', className: 'text-center' },
    { title: '总投资额', index: 'townExtend.total_invest', className: 'text-center' },
    {
      title: '操作',
      buttons: [
        {
          text: '编辑',
          // click: (item: any) => this.router.navigateByUrl(`/order/edit/${item.id}`),
        },
        {
          text: '删除',
          type: 'del',
          // click: (item: any) => this.delOrder(item),
        },
      ],
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
    private apiConfig: ApiConfig
  ) { }

  ngOnInit() {
    this.getTowns();
    this.getCitys();
  }

  getCitys() {
    this.http.get(this.apiConfig.urls.area.getCityBy, { province_id: 5 })
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.citys = res.data[0].cities;
          this.cd.detectChanges();
        }
      });
  }

  getTowns() {
    this.loading = true;
    const params = {
      pi: this.pi,
      ps: this.ps,
      city_id: this.city_id ? this.city_id : 0,
      search_name: this.search_name ? this.search_name : '',
      orderby: ''
    };
    this.http.get(this.apiConfig.urls.towns.list, params)
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.towns = res.data.towns;
          this.total = res.data.total;
          this.cd.detectChanges();
          // this.loading = false;
        }
      });
  }

  _click(e: STChange) {
    if (e.type === 'pi') {
      this.pi = e.pi;
      localStorage.setItem('townlist_pi', String(this.pi));
      this.getTowns();
    }
  }

  doSearch() {
    this.pi = 1;
    localStorage.setItem('townlist_pi', String(this.pi));
    this.getTowns();
  }

  doReset() {
    this.pi = 1;
    localStorage.setItem('townlist_pi', String(this.pi));
    let city_id: number;
    this.city_id = city_id;
    let search_name: string;
    this.search_name = search_name;
    this.getTowns();
  }

}
