import { SettingsService, _HttpClient } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService, isTemplateRef } from 'ng-zorro-antd';
import {
  SocialService,
  SocialOpenType,
  TokenService,
  DA_SERVICE_TOKEN,
} from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { StartupService } from '@core/startup/startup.service';
import { ApiConfig } from 'app/config/api.config';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {
  form: FormGroup;
  error = '';

  constructor(
    fb: FormBuilder,
    modalSrv: NzModalService,
    public msg: NzMessageService,
    private router: Router,
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    private startupSrv: StartupService,
    public http: _HttpClient,
    private apiConfig: ApiConfig
  ) {
    this.form = fb.group({
      username: [null, [Validators.required, Validators.minLength(5)]],
      password: [null, Validators.required],
    });
    modalSrv.closeAll();
  }

  // #region fields

  get username() {
    return this.form.controls.username;
  }
  get password() {
    return this.form.controls.password;
  }
  get mobile() {
    return this.form.controls.mobile;
  }
  get captcha() {
    return this.form.controls.captcha;
  }

  count = 0;
  interval$: any;

  getCaptcha() {
    if (this.mobile.invalid) {
      this.mobile.markAsDirty({ onlySelf: true });
      this.mobile.updateValueAndValidity({ onlySelf: true });
      return;
    }
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) clearInterval(this.interval$);
    }, 1000);
  }

  // #endregion

  submit() {
    this.error = '';
    this.username.markAsDirty();
    this.username.updateValueAndValidity();
    this.password.markAsDirty();
    this.password.updateValueAndValidity();
    if (this.username.invalid || this.password.invalid) return;

    const params = {
      username: this.username.value,
      password: this.password.value,
    };
    // 默认配置中对所有HTTP请求都会强制 [校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
    this.http.post(this.apiConfig.urls.passport.login, params)
      .subscribe((res: any) => {
        if (res.code === 0) {
          if (res.data) {
            this.msg.success('登录成功');
            // 清空路由复用信息
            this.reuseTabService.clear();
            // 设置用户Token信息
            this.tokenService.set({ token: '123' });
            // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
            this.startupSrv.load().then(() => this.router.navigate(['/']));
          }
          else {
            this.msg.error('用户名或密码错误！');
          }
        }
      });
  }


  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  }
}
