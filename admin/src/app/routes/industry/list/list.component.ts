import { Component, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { STComponent, STColumn, STChange, STPage, STData, STColumnTag } from '@delon/abc';
import { _HttpClient } from '@delon/theme';
import { Router } from '@angular/router';
import { ApiConfig } from 'app/config/api.config';

const IS_USE: STColumnTag = {
  0: { text: '禁用', color: 'orange' },
  1: { text: '启用', color: 'green' },
};

@Component({
  selector: 'industry-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndustryListComponent {
  search_text: string;
  // 表格
  @ViewChild('st')
  private st: STComponent;
  // 表格数据
  industries: STData[] = [];
  // 总条数
  total: number = 0;
  // 加载样式
  loading: boolean = true;
  // 当前页数
  pi: number = Number(localStorage.getItem('industrylist_pi')) > 0 ? Number(localStorage.getItem('industrylist_pi')) : 1;
  // 每页条数
  ps: number = 10;
  // 表格字段
  columns: STColumn[] = [
    { title: '产业名称', index: 'industry_name', className: 'text-center' },
    { title: '排序', index: 'sort', className: 'text-center' },
    { title: '状态', index: 'is_use', type: 'tag', tag: IS_USE, className: 'text-center' },
    {
      title: '操作',
      className: 'text-center',
      buttons: [
        {
          text: '编辑',
          click: (item: any) => this.router.navigateByUrl(`/industry/edit/${item.industry_id}`),
        },
        {
          text: '删除',
          type: 'del',
          click: (item: any) => this.delIndustry(item),
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

  ngOnInit(): void {
    this.getIndustries();
  }

  getIndustries(): void {
    this.loading = true;
    const params = {
      pi: this.pi,
      ps: this.ps,
      search_text: this.search_text ? this.search_text : '',
    };
    this.http.get(this.apiConfig.urls.industry.list, params)
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.industries = res.data.industry;
          this.total = res.data.total;
          this.cd.detectChanges();
          this.loading = false;
        }
      });
  }

  _click(e: STChange): void {
    if (e.type === 'pi') {
      this.pi = e.pi;
      this.reloadListData();
    }
  }

  addIndustry(): void {
    this.router.navigateByUrl('/industry/add');
  }

  delIndustry(industry: any): void {
    this.checkRelated(industry.industry_id).then(res => {
      if (!res) {
        this.loading = true;
        this.http.delete(this.apiConfig.urls.industry.del, { industry_id: industry.industry_id })
          .subscribe((res: any) => {
            if (res.code === 0) {
              if (res.data) {
                this.msg.success('删除产业成功', { nzDuration: 2000 });
                setTimeout(() => this.getIndustries(), 2500);
              } else {
                this.msg.warning('删除产业失败');
              };
            }
          });
      } else {
        this.msg.warning('删除产业失败，正在使用中');
      }
    });
  }

  checkRelated(industry_id: number): any {
    return new Promise(resolve => {
      this.http.get(this.apiConfig.urls.industry.hasRelated, { industry_id: industry_id })
        .subscribe((res: any) => {
          if (res.code === 0) {
            resolve(res.data)
          }
        });
    });
  }

  // 搜索
  doSearch() {
    this.pi = 1;
    this.reloadListData();
  }

  // 重置
  doReset() {
    let search_text: string;
    this.search_text = search_text;
    this.pi = 1;
    this.reloadListData();
  }

  // 重新加载列表数据
  reloadListData() {
    localStorage.setItem('industrylist_pi', String(this.pi));
    this.getIndustries();
  }

}
