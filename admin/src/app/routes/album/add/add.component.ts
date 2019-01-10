import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { ApiConfig } from 'app/config/api.config';
import { UEditorComponent } from 'ngx-ueditor';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'album-add',
  templateUrl: './add.component.html',
})
export class AlbumAddComponent implements OnInit {
  towns: any;
  town_id: number;
  types: Array<any>;
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
    this.getTowns();
    this.setTypes();
  }

  initForm(): void {
    this.form = this.fb.group({
      album_name: [null, [Validators.required]],
      town_id: [null, [Validators.required]],
      type: [null, [Validators.required]],
      cover: [null],
      sort: [null]
    });
  }

  getTowns() {
    this.http.get(this.apiConfig.urls.town.list, { pi: 1, ps: 12 })
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.towns = res.data.towns.map(item => ({ town_id: item.town_id, town_name: item.town_name }));
        }
      })
  }

  setTypes() {
    this.types = [
      { name: '普通', value: 0 },
      { name: '轮播', value: 1 },
      { name: '规划图', value: 2 }
    ];
  }

  submit(form: FormGroup): void {
    if (!this.submitting) {
      this.submitting = true;
      this.http.post(this.apiConfig.urls.town.album.add, form.value)
        .subscribe((res: any) => {
          if (res.code === 0) {
            if (res.data) {
              this.msg.success('添加相册成功', { nzDuration: 2000 });
              setTimeout(() => this.router.navigateByUrl(`/album/list`), 2500);
            } else {
              this.msg.warning('添加相册失败', { nzDuration: 2000 });
              setTimeout(() => this.router.navigateByUrl(`/album/list`), 2500);
            };
          } else {
            this.msg.warning('添加相册失败', { nzDuration: 2000 });
            setTimeout(() => this.router.navigateByUrl(`/album/list`), 2500);
          }
        })
    }
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
            cover: res.data.images[0].img_cover
          });
        }
        break;
      case 'removed':
        this.form.patchValue({
          cover: null
        });
        break;
    }
  }
  // 主图上传相关 END ################################################
}