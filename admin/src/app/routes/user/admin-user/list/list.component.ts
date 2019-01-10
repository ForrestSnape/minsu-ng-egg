import { Component, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, isTemplateRef } from 'ng-zorro-antd';
import { STComponent, STColumn, STChange, STPage, STData, STColumnTag } from '@delon/abc';
import { _HttpClient } from '@delon/theme';
import { Router } from '@angular/router';
import { ApiConfig } from 'app/config/api.config';
import { FunctionService } from '@shared/service/function.service';
import { RuleConfig } from 'app/config/rule.config';

const STATUS: STColumnTag = {
  1: { text: '启用', color: 'green' },
  2: { text: '禁用', color: 'orange' },
};

@Component({
  selector: 'user-admin-user-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAdminUserListComponent {
  search_text: string;
  selectedRows: Array<number> = [];

  // 表格
  @ViewChild('st')
  private st: STComponent;
  // 表格数据
  adminUsers: STData[] = [];
  // 总条数
  total: number = 0;
  // 加载样式
  loading: boolean = true;
  // 当前页数
  pi: number = Number(localStorage.getItem('adminuserlist_pi')) > 0 ? Number(localStorage.getItem('adminuserlist_pi')) : 1;
  // 每页条数
  ps: number = 10;

  // 表格字段
  columns: STColumn[] = [
    {
      title: '用户ID',
      index: 'uid',
      type: 'checkbox',
      selections: [
        {
          text: '已启用',
          select: (data: any[]) =>
            data.forEach(item => (item.checked = item.user_status == 1)),
        },
        {
          text: '已禁用',
          select: (data: any[]) =>
            data.forEach(item => (item.checked = item.user_status == 2)),
        },
      ],
    },
    {
      title: '头像',
      type: 'img',
      index: 'user_headimg',
      className: 'text-center'
    },
    {
      title: '账号',
      index: 'user_name',
      className: 'text-center'
    },
    {
      title: '昵称',
      index: 'nick_name',
      className: 'text-center'
    },
    {
      title: '角色',
      index: 'role.name',
      className: 'text-center'
    },
    {
      title: '状态',
      index: 'user_status',
      type: 'tag',
      tag: STATUS,
      className: 'text-center'
    },
    {
      title: '操作',
      className: 'text-center',
      buttons: [
        {
          text: '编辑',
          click: (item: any) => this.router.navigateByUrl(`/user/admin-user/edit/${item.uid}`),
        },
        {
          text: '删除',
          type: 'del',
          click: (item: any) => this.delAdminUser(item.uid),
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
    private ruleConfig: RuleConfig,
    private fs: FunctionService
  ) { }

  ngOnInit(): void {
    this.getAdminUsers();
  }

  getAdminUsers(): void {
    this.loading = true;
    const params = {
      pi: this.pi,
      ps: this.ps,
      search_text: this.search_text ? this.search_text : ''
    };
    this.http.get(this.apiConfig.urls.user.adminUser.list, params)
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.adminUsers = res.data.user.map(item => {
            if (item.user_headimg) {
              item.user_headimg = this.apiConfig.sourceAddr + item.user_headimg;
            }
            return item;
          });
          this.total = res.data.total;
          this.cd.detectChanges();
          this.loading = false;
        }
      });
  }

  // 点击动作 分页、排序等
  _click(e: STChange): void {
    if (e.type === 'checkbox') {
      this.selectedRows = e.checkbox.map(item => item.uid);
    }
    if (e.type === 'pi') {
      this.pi = e.pi;
      this.reloadListData();
    }
  }

  addAdminUser(): void {
    this.router.navigateByUrl('/user/admin-user/add');
  }

  delAdminUser(uid: number): void {
    this.loading = true;
    this.http.delete(this.apiConfig.urls.user.adminUser.del, { uid: uid })
      .subscribe((res: any) => {
        if (res.code === 0) {
          if (res.data) {
            this.msg.success('删除用户成功', { nzDuration: 2000 });
            setTimeout(() => this.reloadListData(), 2500);
          } else {
            this.msg.warning('删除用户失败', { nzDuration: 2000 });
            setTimeout(() => this.reloadListData(), 2500);
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
    let search_text: string;
    this.search_text = search_text;
    this.pi = 1;
    this.reloadListData();
  }

  // 批量操作
  // type 1删除 2发布 3取消发布
  batch(type) {
    const type_name = type === 1 ? '删除' : type === 2 ? '启用' : type === 3 ? '禁用' : '删除';
    this.loading = true;
    this.http.post(this.apiConfig.urls.user.adminUser.batch, { uid: this.selectedRows, batch_type: type })
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
    localStorage.setItem('adminuserlist_pi', String(this.pi));
    this.getAdminUsers();
  }
}
