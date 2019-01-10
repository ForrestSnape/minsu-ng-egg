import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { ApiConfig } from 'app/config/api.config';

@Component({
  selector: 'article-category-add',
  templateUrl: './category-add.component.html',
})
export class ArticleCategoryAddComponent implements OnInit {
  form: FormGroup;
  submitting: boolean = false;

  categories: Array<object> = [];

  constructor(
    private http: _HttpClient,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private msg: NzMessageService,
    private router: Router,
    private apiConfig: ApiConfig
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
  }

  // 构建表单
  initForm(): void {
    this.form = this.fb.group({
      pid: [null, [Validators.required]],
      name: [null, [Validators.required]],
      sort: [0, [Validators.required, this.sortValidator]],
    });
  }

  // 全部分类
  getCategories(): void {
    this.http.get(this.apiConfig.urls.article.category.list)
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.categories = this.dealCategories(res.data);
          this.cd.detectChanges();
        }
      });
  }

  // 组合全部分类排序展现方式
  dealCategories(root: any): Array<object> {
    const stack = [];
    this.visitNode(root, stack, 0);
    stack.unshift({ category_id: 0, name: `顶级分类` });
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
      array.push({ category_id: item.category_id, name: `${sign}${item.name}` });
      if (item.children.length > 0) {
        this.visitNode(item.children, array, level + 1)
      }
    })
  }

  submit(form: FormGroup): void {
    if (!this.submitting) {
      this.submitting = true;
      this.http.post(this.apiConfig.urls.article.category.add, form.value)
        .subscribe((res: any) => {
          if (res.code === 0) {
            if (res.data.category_id > 0) {
              this.msg.success('添加分类成功', { nzDuration: 2000 });
              setTimeout(() => this.router.navigateByUrl(`/article/category/list`), 2500);
            } else {
              this.msg.warning('添加分类失败', { nzDuration: 2000 });
              setTimeout(() => this.router.navigateByUrl(`/article/category/list`), 2500);
            };
          }
        })
    }
  }

  sortValidator(sort: FormControl): object {
    return /^[0-9]+.?[0-9]*/.test(sort.value) ? null : { sort: true };
  }

}
