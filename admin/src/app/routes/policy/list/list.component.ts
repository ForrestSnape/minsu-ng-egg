import { Component, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, isTemplateRef } from 'ng-zorro-antd';
import { STComponent, STColumn, STChange, STPage, STData, STColumnTag } from '@delon/abc';
import { _HttpClient } from '@delon/theme';
import { Router } from '@angular/router';
import { ApiConfig } from 'app/config/api.config';
import { FunctionService } from '@shared/service/function.service';

const STATUS: STColumnTag = {
  1: { text: '不展示', color: 'orange' },
  2: { text: '展示', color: 'green' },
};

@Component({
  selector: 'policy-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyListComponent {
  date_range: Array<Date> = [];
  search_text: string;
  order_by: number;
  selectedRows: Array<number> = [];

  // 表格
  @ViewChild('st')
  private st: STComponent;
  // 表格数据
  policies: STData[] = [];
  // 总条数
  total: number = 0;
  // 加载样式
  loading: boolean = true;
  // 当前页数
  pi: number = Number(localStorage.getItem('policylist_pi')) > 0 ? Number(localStorage.getItem('policylist_pi')) : 1;
  // 每页条数
  ps: number = 10;

  // 表格字段
  columns: STColumn[] = [
    {
      title: '政策ID',
      index: 'policy_id',
      type: 'checkbox',
      selections: [
        {
          text: '展示',
          select: (data: any[]) =>
            data.forEach(item => (item.checked = item.status == 2)),
        },
        {
          text: '未展示',
          select: (data: any[]) =>
            data.forEach(item => (item.checked = item.status == 1)),
        },
      ],
    },
    {
      title: '标题',
      index: 'title',
      className: 'text-center'
    },
    {
      title: '来源',
      index: 'source',
      className: 'text-center'
    },
    {
      title: '点击量',
      index: 'clicks',
      type: 'number',
      sort: true,
      className: 'text-left'
    },
    {
      title: '发布时间',
      index: 'publish_time',
      format: (item: any) => this.fs.getDateFormatByTimestamp(item.publish_time, 'day'),
      sort: true,
      className: 'text-left'
    },
    {
      title: '展示状态',
      index: 'status',
      type: 'tag',
      tag: STATUS,
      className: 'text-left'
    },
    {
      title: '操作',
      className: 'text-center',
      buttons: [
        {
          text: '编辑',
          click: (item: any) => this.router.navigateByUrl(`/policy/edit/${item.policy_id}`),
        },
        {
          text: '删除',
          type: 'del',
          click: (item: any) => this.delPolicy(item),
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
    private apiConfig: ApiConfig,
    private fs: FunctionService
  ) { }

  ngOnInit(): void {
    this.getPolicies();
  }

  getPolicies(): void {
    this.loading = true;
    const date_range = this.date_range.map(item => Math.round(item.getTime() / 1000));
    const params = {
      pi: this.pi,
      ps: this.ps,
      begin_time: date_range[0] ? date_range[0] : '',
      end_time: date_range[1] ? date_range[1] : '',
      search_text: this.search_text ? this.search_text : '',
      order_by: this.order_by
    };
    this.http.get(this.apiConfig.urls.policy.list, params)
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.policies = res.data.policy;
          this.total = res.data.total;
          this.cd.detectChanges();
          this.loading = false;
        }
      });
  }

  // 点击动作 分页、排序等
  _click(e: STChange): void {
    if (e.type === 'checkbox') {
      this.selectedRows = e.checkbox.map(item => item.policy_id);
    }
    if (e.type === 'pi') {
      this.pi = e.pi;
      this.reloadListData();
    }
    if (e.type === 'sort') {
      if (e.sort.value) {
        let key = e.sort.column.index[0] + ' ' + e.sort.value;
        this.order_by = this.apiConfig.orderBy[key];
      } else {
        this.order_by = 0;
      }
      this.pi = 1;
      this.reloadListData();
    }
  }

  addPolicy(): void {
    this.router.navigateByUrl('/policy/add');
  }

  delPolicy(policy: any): void {
    this.loading = true;
    this.http.delete(this.apiConfig.urls.policy.del, { policy_id: policy.policy_id })
      .subscribe((res: any) => {
        if (res.code === 0) {
          if (res.data) {
            this.msg.success('删除政策成功', { nzDuration: 2000 });
            setTimeout(() => this.reloadListData(), 2500);
          } else {
            this.msg.warning('删除政策失败')
          };
        }
      });
  }

  // 搜索
  doSearch() {
    this.pi = 1;
    this.reloadListData();
  }

  // 重置
  doReset() {
    let date_range: Array<Date> = [];
    let search_text: string;
    this.date_range = date_range;
    this.search_text = search_text;
    this.pi = 1;
    this.reloadListData();
  }

  // 批量操作
  // type 1删除 2发布 3取消发布
  batch(type) {
    const type_name = type === 1 ? '删除' : type === 2 ? '发布' : type === 3 ? '取消发布' : '删除';
    this.loading = true;
    this.http.post(this.apiConfig.urls.policy.batch, { policy_id: this.selectedRows, batch_type: type })
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

  // 重新加载列表数据
  reloadListData() {
    localStorage.setItem('policylist_pi', String(this.pi));
    this.getPolicies();
  }

}
