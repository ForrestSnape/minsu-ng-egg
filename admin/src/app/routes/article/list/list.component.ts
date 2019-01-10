import { Component, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, isTemplateRef } from 'ng-zorro-antd';
import { STComponent, STColumn, STChange, STPage, STData, STColumnTag } from '@delon/abc';
import { _HttpClient } from '@delon/theme';
import { Router } from '@angular/router';
import { ApiConfig } from 'app/config/api.config';
import { FunctionService } from '@shared/service/function.service';
import { RuleConfig } from 'app/config/rule.config';

const STATUS: STColumnTag = {
  1: { text: '未发布', color: 'orange' },
  2: { text: '已发布', color: 'green' },
};

@Component({
  selector: 'article-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent {
  categories: Array<object> = [];
  category_id: number;
  date_range: Array<Date> = [];
  search_text: string;
  order_by: number;
  selectedRows: Array<number> = [];

  // 表格
  @ViewChild('st')
  private st: STComponent;
  // 表格数据
  articles: STData[] = [];
  // 总条数
  total: number = 0;
  // 加载样式
  loading: boolean = true;
  // 当前页数
  pi: number = Number(localStorage.getItem('articlelist_pi')) > 0 ? Number(localStorage.getItem('articlelist_pi')) : 1;
  // 每页条数
  ps: number = 10;

  // 表格字段
  columns: STColumn[] = [
    {
      title: '文章ID',
      index: 'article_id',
      type: 'checkbox',
      selections: [
        {
          text: '已发布',
          select: (data: any[]) =>
            data.forEach(item => (item.checked = item.status == 2)),
        },
        {
          text: '未发布',
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
      title: '分类',
      index: 'articleCategory.name',
      className: 'text-center'
    },
    {
      title: '作者',
      index: 'author',
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
      title: '创建时间',
      index: 'create_time',
      format: (item: any) => this.fs.getDateFormatByTimestamp(item.create_time),
      sort: true,
      className: 'text-left'
    },
    {
      title: '状态',
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
          acl: this.ruleConfig.rules.article.edit,
          text: '编辑',
          click: (item: any) => this.router.navigateByUrl(`/article/edit/${item.article_id}`),
        },
        {
          acl: this.ruleConfig.rules.article.del,
          text: '删除',
          type: 'del',
          click: (item: any) => this.delArticle(item),
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
    this.getCategories();
    this.getArticles();
  }

  getArticles(): void {
    this.loading = true;
    const date_range = this.date_range.map(item => Math.round(item.getTime() / 1000));
    const params = {
      pi: this.pi,
      ps: this.ps,
      category_id: this.category_id,
      begin_time: date_range[0] ? date_range[0] : '',
      end_time: date_range[1] ? date_range[1] : '',
      search_text: this.search_text ? this.search_text : '',
      order_by: this.order_by
    };
    this.http.get(this.apiConfig.urls.article.list, params)
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.articles = res.data.article;
          this.total = res.data.total;
          this.cd.detectChanges();
          this.loading = false;
        }
      });
  }

  // 点击动作 分页、排序等
  _click(e: STChange): void {
    if (e.type === 'checkbox') {
      this.selectedRows = e.checkbox.map(item => item.article_id);
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

  addArticle(): void {
    this.router.navigateByUrl('/article/add');
  }

  delArticle(article: any): void {
    this.loading = true;
    this.http.delete(this.apiConfig.urls.article.del, { article_id: article.article_id })
      .subscribe((res: any) => {
        if (res.code === 0) {
          if (res.data) {
            this.msg.success('删除文章成功', { nzDuration: 2000 });
            setTimeout(() => this.reloadListData(), 2500);
          } else {
            this.msg.warning('删除文章失败', { nzDuration: 2000 });
            setTimeout(() => this.reloadListData(), 2500);
          };
        }
      });
  }

  getCategories(): void {
    this.http.get(this.apiConfig.urls.article.category.list)
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.categories = this.dealCategories(res.data);
          this.cd.detectChanges();
        }
      });
  }

  dealCategories(root: any): Array<object> {
    const stack = [];
    this.visitNode(root, stack, 0);
    return stack;
  }

  visitNode(root: any, array: Array<object>, level: number): void {
    root.map((item: any) => {
      let sign = '';
      if (level > 0) {
        for (let i = 0; i < level; i++) {
          sign += '──';
        }
      }
      array.push({ class_id: item.class_id, name: `${sign}${item.name}` });
      if (item.children.length > 0) {
        this.visitNode(item.children, array, level + 1)
      }
    })
  }

  // 搜索
  doSearch() {
    this.pi = 1;
    this.reloadListData();
  }

  // 重置
  doReset() {
    let category_id: number;
    let date_range: Array<Date> = [];
    let search_text: string;
    this.category_id = category_id;
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
    this.http.post(this.apiConfig.urls.article.batch, { article_id: this.selectedRows, batch_type: type })
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
    localStorage.setItem('articlelist_pi', String(this.pi));
    this.getArticles();
  }
}
