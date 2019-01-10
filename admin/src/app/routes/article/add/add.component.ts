import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { ApiConfig } from 'app/config/api.config';
import { UEditorComponent } from 'ngx-ueditor';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'article-add',
  templateUrl: './add.component.html',
})
export class ArticleAddComponent implements OnInit {
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
    private apiConfig: ApiConfig
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
  }

  initForm(): void {
    this.form = this.fb.group({
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
      this.http.post(this.apiConfig.urls.article.add, form.value)
        .subscribe((res: any) => {
          if (res.code === 0) {
            if (res.data) {
              this.msg.success('添加文章成功', { nzDuration: 2000 });
              setTimeout(() => this.router.navigateByUrl(`/article/list`), 2500);
            } else {
              this.msg.warning('添加文章失败', { nzDuration: 2000 });
              setTimeout(() => this.router.navigateByUrl(`/article/list`), 2500);
            };
          } else {
            this.msg.warning('添加文章失败', { nzDuration: 2000 });
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
        this.attachment_path = this.attachment_path.replace(e.file.response.data.files[0] + ';', '');
        this.form.patchValue({
          attachment_path: this.attachment_path
        });
        break;
    }
  }
  // 附件上传相关 END ################################################
}