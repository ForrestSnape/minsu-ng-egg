import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { ApiConfig } from 'app/config/api.config';
import { RuleConfig } from 'app/config/rule.config';

@Component({
  selector: 'article-category-list',
  templateUrl: './category-list.component.html',
})
export class ArticleCategoryListComponent implements OnInit {
  loading: boolean = true;

  categories: any = [];
  expandDataCache: any = {};

  constructor(
    private http: _HttpClient,
    private cd: ChangeDetectorRef,
    private router: Router,
    private msg: NzMessageService,
    private apiConfig: ApiConfig,
    private ruleConfig: RuleConfig
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  // 获取所有分类
  getCategories() {
    this.loading = true;
    this.http.get(this.apiConfig.urls.article.category.list)
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.categories = res.data;
          this.setExpandDataCache();
          this.cd.detectChanges();
          this.loading = false;
        }
      });
  }

  // 分类排序展现
  setExpandDataCache() {
    this.categories.forEach(item => {
      this.expandDataCache[item.category_id] = this.convertTreeToList(item);
    });
  }

  convertTreeToList(root) {
    const stack = [];
    const array = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: true });
    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level + 1, expand: true, parent: node });
        }
      }
    }
    return array;
  }

  visitNode(node, hashMap, array) {
    if (!hashMap[node.category_id]) {
      hashMap[node.category_id] = true;
      array.push(node);
    }
  }

  collapse(array, data, $event) {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.category_id === d.category_id);
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  addCategory() {
    this.router.navigateByUrl('/article/category/add');
  }

  editCategory(category_id) {
    this.router.navigateByUrl(`/article/category/edit/${category_id}`);
  }

  delCategory(category_id) {
    this.checkRelated(category_id).then(res => {
      if (!res) {
        this.loading = true;
        this.http.delete(this.apiConfig.urls.article.category.del, { category_id: category_id })
          .subscribe((res: any) => {
            if (res.code === 0) {
              if (res.data) {
                this.msg.success('删除分类成功！', { nzDuration: 2000 });
                setTimeout(() => this.getCategories(), 2500);
              } else {
                this.msg.warning('删除分类失败！')
              };
            }
          });
      } else {
        this.msg.warning('删除分类失败，此分类正在使用中')
      }
    });
  }

  checkRelated(category_id: number): any {
    return new Promise(resolve => {
      this.http.get(this.apiConfig.urls.article.category.hasRelated, { category_id: category_id })
        .subscribe((res: any) => {
          if (res.code === 0) {
            resolve(res.data)
          }
        });
    });
  }

}