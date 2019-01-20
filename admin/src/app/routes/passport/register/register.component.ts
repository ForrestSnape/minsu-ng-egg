import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { ApiConfig } from 'app/config/api.config';

@Component({
  selector: 'passport-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class UserRegisterComponent implements OnDestroy {
  form: FormGroup;
  interval$: any;

  constructor(
    fb: FormBuilder,
    private router: Router,
    public http: _HttpClient,
    public msg: NzMessageService,
    private apiConfig: ApiConfig
  ) {
    this.form = fb.group({
      username: [null],
      nickname: [null],
      password: [null],
      invite_code: [null]
    });
  }

  submit() {
    const check = this.check(this.form.value);
    if (!check.check) {
      this.msg.warning(check.msg);
      return;
    }
    this.http.post(this.apiConfig.urls.passport.register, this.form.value)
      .subscribe((res: any) => {
        if (res.status) {
          this.msg.success('注册成功');
          this.router.navigateByUrl('/passport/login');
        } else {
          this.msg.warning(res.msg);
          return;
        }
      });
  }

  check(params) {
    if (!(params.username && /^[A-Za-z0-9]+$/.test(params.username))) return { check: false, msg: '账户格式不正确' };
    if (!params.nickname) return { check: false, msg: '昵称必填' };
    if (!params.password) return { check: false, msg: '密码必填' };
    if (!params.invite_code) return { check: false, msg: '邀请码必填' };
    return { check: true };
  }

  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  }
}
