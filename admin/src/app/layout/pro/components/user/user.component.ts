import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService, _HttpClient } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ApiConfig } from 'app/config/api.config';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'layout-pro-user',
  templateUrl: 'user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutProWidgetUserComponent implements OnInit {

  cnVisible: boolean = false;
  cnOkLoading: boolean = false;
  nickname: string;

  cpVisible: boolean = false;
  cpOkLoading: boolean = false;
  passwordOld: string;
  password: string;

  constructor(
    private http: _HttpClient,
    public settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private apiConfig: ApiConfig,
    private cd: ChangeDetectorRef,
    private msg: NzMessageService
  ) { }

  ngOnInit(): void {
    this.nickname = this.settings.user.nickname;
    // mock
    const token = this.tokenService.get() || {
      token: 'nothing',
      name: 'Admin',
      avatar: './assets/logo-color.svg',
      email: 'cipchk@qq.com',
    };
    this.tokenService.set(token);
  }

  changeNickname() {
    this.cnVisible = true;
  }

  cnCancel() {
    this.cnVisible = false;
  }

  cnOk() {
    this.cnOkLoading = true;
    this.http.post(this.apiConfig.urls.user.changeNickname, { nickname: this.nickname })
      .subscribe((res: any) => {
        if (res) {
          this.msg.success('修改昵称成功');
          this.settings.user.nickname = this.nickname;
          this.cnOkLoading = false;
          this.cnVisible = false;
          this.cd.detectChanges();
        }
      })
  }

  changePassword() {
    this.cpVisible = true;
  }

  cpCancel() {
    this.cpVisible = false;
  }

  cpOk() {
    this.cpOkLoading = true;
    this.http.post(this.apiConfig.urls.user.changePassword, { passwordOld: this.passwordOld, password: this.password })
      .subscribe((res: any) => {
        this.cpOkLoading = false;
        if (res.status) {
          this.msg.success(res.msg);
          this.cpVisible = false;
          this.cd.detectChanges();
        } else {
          this.msg.warning(res.msg);
        }
      })
  }


  logout() {
    this.tokenService.clear();
    this.router.navigateByUrl(this.tokenService.login_url);
  }
}
