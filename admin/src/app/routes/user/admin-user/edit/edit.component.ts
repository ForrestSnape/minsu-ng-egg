import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiConfig } from 'app/config/api.config';
import { UEditorComponent } from 'ngx-ueditor';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'user-admin-user-edit',
  templateUrl: './edit.component.html',
})
export class UserAdminUserEditComponent implements OnInit {
  uid: number;
  adminUser: any;
  roles: any;
  @ViewChild('full') full: UEditorComponent;
  form: FormGroup;
  submitting: boolean = false;

  constructor(
    private http: _HttpClient,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private msg: NzMessageService,
    private router: Router,
    private apiConfig: ApiConfig,
    private acroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.uid = this.acroute.snapshot.params.uid;
    this.initForm();
    this.getAdminUser();
    this.getRoles();
  }

  initForm(): void {
    this.form = this.fb.group({
      uid: [this.uid],
      user_name: [null, [Validators.required]],
      user_password: [null],
      role_id: [null, [Validators.required]],
      nick_name: [null],
      user_headimg: [null],
      real_name: [null],
      sex: ['0'],
      birthday: [null],
      user_tel: [null],
      user_qq: [null],
      user_email: [null, [Validators.email]],
      addr: [null],
      user_status: ['1', [Validators.required]],
    });
  }

  getAdminUser(): void {
    this.http.get(this.apiConfig.urls.user.adminUser.detail, { uid: this.uid })
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.adminUser = res.data;
          this.form.patchValue({
            user_name: this.adminUser.user_name,
            user_password: this.adminUser.user_password,
            role_id: String(this.adminUser.role_id),
            nick_name: this.adminUser.nick_name,
            user_headimg: this.adminUser.user_headimg,
            real_name: this.adminUser.real_name,
            sex: String(this.adminUser.sex),
            birthday: new Date(this.adminUser.birthday * 1000),
            user_tel: this.adminUser.user_tel,
            user_qq: this.adminUser.user_qq,
            user_email: this.adminUser.user_email,
            addr: this.adminUser.addr,
            user_status: String(this.adminUser.user_status),
          });
          if (this.adminUser.user_headimg) {
            this.imageList.push({
              status: 'done',
              url: this.apiConfig.sourceAddr + this.adminUser.user_headimg
            });
          }
        }
      })
  }

  getRoles(): void {
    this.http.get(this.apiConfig.urls.user.role.list)
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.roles = res.data;
        }
      })
  }

  submit(form: FormGroup): void {
    if (!this.submitting) {
      this.submitting = true;
      if (form.value.birthday) {
        form.value.birthday = Math.round(form.value.birthday.getTime() / 1000);
      }
      if (!form.value.user_password) {
        form.value.user_password = '';
      }
      this.http.post(this.apiConfig.urls.user.adminUser.edit, form.value)
        .subscribe((res: any) => {
          if (res.code === 0) {
            if (res.data) {
              this.msg.success('编辑用户成功', { nzDuration: 2000 });
              setTimeout(() => this.router.navigateByUrl(`/user/admin-user/list`), 2500);
            } else {
              this.msg.warning('编辑用户失败', { nzDuration: 2000 });
              setTimeout(() => this.router.navigateByUrl(`/user/admin-user/list`), 2500);
            };
          } else {
            this.msg.warning('编辑用户失败', { nzDuration: 2000 });
            setTimeout(() => this.router.navigateByUrl(`/user/admin-user/list`), 2500);
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
            user_headimg: res.data.images[0].img_cover
          });
        }
        break;
      case 'removed':
        this.form.patchValue({
          user_headimg: null
        });
        break;
    }
  }
  // 主图上传相关 END ################################################
}