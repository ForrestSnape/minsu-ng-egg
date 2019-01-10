import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { ApiConfig } from 'app/config/api.config';

@Component({
  selector: 'industry-add',
  templateUrl: './add.component.html',
})
export class IndustryAddComponent implements OnInit {
  form: FormGroup;
  submitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: _HttpClient,
    private msg: NzMessageService,
    private router: Router,
    private apiConfig: ApiConfig
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      industry_name: [null, [Validators.required]],
      sort: [0, [Validators.required, this.sortValidator]],
      is_use: [1, [Validators.required]],
    });
  }

  submit(form: FormGroup): void {
    if (!this.submitting) {
      this.submitting = true;
      this.http.post(this.apiConfig.urls.industry.add, form.value)
        .subscribe((res: any) => {
          if (res.code === 0) {
            if (res.data) {
              this.msg.success('添加产业成功', { nzDuration: 2000 });
              setTimeout(() => this.router.navigateByUrl(`/industry/list`), 2500);
            } else {
              this.msg.success('添加产业失败', { nzDuration: 2000 });
              setTimeout(() => this.router.navigateByUrl(`/industry/list`), 2500);
            };
          }
        })
    }
  }

  sortValidator(sort: FormControl): object {
    return /^[0-9]+.?[0-9]*/.test(sort.value) ? null : { sort: true };
  }

}
