import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { ApiConfig } from 'app/config/api.config';
import { UEditorComponent } from 'ngx-ueditor';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'policy-add',
  templateUrl: './add.component.html',
})
export class PolicyAddComponent implements OnInit {
  @ViewChild('full') full: UEditorComponent;
  form: FormGroup;
  submitting: boolean = false;

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
  }

  initForm(): void {
    this.form = this.fb.group({
      title: [null, [Validators.required]],
      source: [null, [Validators.required]],
      publish_time: [null, [Validators.required]],
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

  submit(form: FormGroup): void {
    if (!this.submitting) {
      this.submitting = true;
      form.value.publish_time = Math.round(form.value.publish_time.getTime() / 1000);
      this.http.post(this.apiConfig.urls.policy.add, form.value)
        .subscribe((res: any) => {
          if (res.code === 0) {
            if (res.data) {
              this.msg.success('添加政策成功', { nzDuration: 2000 });
              setTimeout(() => this.router.navigateByUrl(`/policy/list`), 2500);
            } else {
              this.msg.warning('添加政策失败', { nzDuration: 2000 });
              setTimeout(() => this.router.navigateByUrl(`/policy/list`), 2500);
            };
          } else {
            this.msg.warning('添加政策失败', { nzDuration: 2000 });
            setTimeout(() => this.router.navigateByUrl(`/policy/list`), 2500);
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
      const isPDF = postfix === 'pdf';
      const isDOC = postfix === 'doc';
      const isDOCX = postfix === 'docx';
      if (!isPDF && !isDOC && !isDOCX) {
        this.msg.error('政策文件仅限pdf、doc、docx格式!');
        observer.complete();
        return;
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        this.msg.error('政策文件大小不能超过10MB!');
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
          this.form.patchValue({
            attachment_path: res.data.files[0]
          });
        }
        break;
      case 'removed':
        this.form.patchValue({
          attachment_path: null
        });
        break;
    }
  }
  // 附件上传相关 END ################################################
}