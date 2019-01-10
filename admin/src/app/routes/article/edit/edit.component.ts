import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiConfig } from 'app/config/api.config';
import { UEditorComponent } from 'ngx-ueditor';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'article-edit',
  templateUrl: './edit.component.html',
})
export class ArticleEditComponent implements OnInit {
  article_id: number;
  article: any;
  attachment_path: string = '';
  @ViewChild('full') full: UEditorComponent;
  form: FormGroup;
  submitting: boolean = false;

  categories: Array<object> = [];

  constructor(
    private http: _HttpClient,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private msg: NzMessageService,
    private router: Router,
    private acroute: ActivatedRoute,
    private apiConfig: ApiConfig
  ) { }

  ngOnInit(): void {
    this.article_id = this.acroute.snapshot.params.article_id;
    this.initForm();
    this.getArticle();
    this.getCategories();
  }

  // 构建表单结构
  initForm(): void {
    this.form = this.fb.group({
      article_id: [this.article_id],
      category_id: [null, [Validators.required]],
      title: [null, [Validators.required]],
      short_title: [null],
      source: [null],
      url_prefix: ['Http://'],
      url: [null],
      author: [null],
      summary: [null],
      content: [null],
      image: [null],
      keyword: [null],
      clicks: [null],
      sort: [null],
      status: ['2', [Validators.required]],
      attachment_path: [null],
      share_count: [null],
    });
  }

  // 获取文章详情 并初始化表单数据
  getArticle(): void {
    this.http.get(this.apiConfig.urls.article.detail, { article_id: this.article_id })
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.article = res.data;
          const url_prefix = this.article.url ? this.article.url.split('//')[0] + '//' : 'Http://';
          const url = this.article.url ? this.article.url.split('//')[1] : '';
          this.form.patchValue({
            category_id: String(this.article.category_id),
            title: this.article.title,
            short_title: this.article.short_title,
            source: this.article.source,
            url_prefix: url_prefix,
            url: url,
            author: this.article.author,
            summary: this.article.summary,
            content: this.article.content,
            image: this.article.image,
            keyword: this.article.keyword,
            clicks: this.article.clicks,
            sort: this.article.sort,
            status: String(this.article.status),
            attachment_path: this.article.attachment_path,
            share_count: this.article.share_count,
          });
          if (this.article.image) {
            this.imageList.push({
              status: 'done',
              url: this.apiConfig.sourceAddr + this.article.image
            });
          }
          if (this.article.attachment_path) {
            this.attachment_path = this.article.attachment_path;
            this.article.attachment_path.split(';').map((item, index) => {
              if (item) {
                this.fileList.push({
                  uid: index,
                  name: item.split('/')[item.split('/').length - 1],
                  status: 'done',
                  path: item,
                  url: this.apiConfig.sourceAddr + item
                })
              }
            });
            this.cd.detectChanges();
          }
        }
      })
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
      array.push({ category_id: item.category_id, name: `${sign}${item.name}` });
      if (item.children.length > 0) {
        this.visitNode(item.children, array, level + 1)
      }
    })
  }

  submit(form: FormGroup): void {
    if (!this.submitting) {
      this.submitting = true;
      if (form.value.url) form.value.url = form.value.url_prefix + form.value.url;
      this.http.post(this.apiConfig.urls.article.edit, form.value)
        .subscribe((res: any) => {
          if (res.code === 0) {
            if (res.data) {
              this.msg.success('编辑文章成功', { nzDuration: 2000 });
              setTimeout(() => this.router.navigateByUrl(`/article/list`), 2500);
            } else {
              this.msg.warning('编辑文章失败', { nzDuration: 2000 });
              setTimeout(() => this.router.navigateByUrl(`/article/list`), 2500);
            };
          } else {
            this.msg.warning('编辑文章失败', { nzDuration: 2000 });
            setTimeout(() => this.router.navigateByUrl(`/article/list`), 2500);
          }
        })
    }
  }

  sortValidator(sort: FormControl): object {
    return /^[0-9]+.?[0-9]*/.test(sort.value) ? null : { sort: true };
  }


  // 主图上传相关 BEGIN ##############################################
  imageUploadUrl = this.apiConfig.urls.upload.img;
  imageList = [];
  previewImage = '';
  previewImageVisible = false;
  handleImagePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewImageVisible = true;
  }

  beforeImageUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isGIF = file.type === 'image/gif';
      const isBMP = file.type === 'image/bmp';
      if (!isJPG && !isPNG && !isGIF && !isBMP) {
        this.msg.error('图片格式仅限jpeg/jpg/png/gif/bmp!');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('图片大小不能超过2MB!');
        observer.complete();
        return;
      }
      observer.next(isLt2M);
      observer.complete();
    });
  }

  handleImageChange(e: any) {
    switch (e.file.status) {
      case 'done':
        const res = e.file.response;
        if (res.code === 0) {
          this.form.patchValue({
            image: res.data.images[0].img_cover
          });
        }
        break;
      case 'removed':
        this.form.patchValue({
          image: null
        });
        break;
    }
  }
  // 主图上传相关 END ################################################

  // 附件上传相关 BEGIN ##############################################
  fileUploadUrl = this.apiConfig.urls.upload.file;
  fileList = [];

  beforeFileUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      let postfix = file.name.toLowerCase().split('.').splice(-1)[0];
      const isZIP = postfix === 'zip';
      const isRAR = postfix === 'rar';
      if (!isZIP && !isRAR) {
        this.msg.error('附件请打包zip或rar格式上传!');
        observer.complete();
        return;
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.msg.error('附件大小不能超过10MB!');
        observer.complete();
        return;
      }
      observer.next(isLt10M);
      observer.complete();
    });
  }

  handleFileChange(e: any) {
    switch (e.file.status) {
      case 'done':
        const res = e.file.response;
        if (res.code === 0) {
          this.attachment_path += res.data.files[0] + ';';
          this.form.patchValue({
            attachment_path: this.attachment_path
          });
        }
        break;
      case 'removed':
        this.attachment_path = this.attachment_path.replace(e.file.path + ';', '');
        this.form.patchValue({
          attachment_path: this.attachment_path
        });
        break;
    }
  }
  // 附件上传相关 END ################################################

}
