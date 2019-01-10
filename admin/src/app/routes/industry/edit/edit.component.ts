import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiConfig } from 'app/config/api.config';

@Component({
  selector: 'industry-edit',
  templateUrl: './edit.component.html',
})
export class IndustryEditComponent implements OnInit {
  industry_id: number;
  industry: any;

  form: FormGroup;
  submitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: _HttpClient,
    private msg: NzMessageService,
    private router: Router,
    private acroute: ActivatedRoute,
    private apiConfig: ApiConfig
  ) { }

  ngOnInit(): void {
    this.industry_id = this.acroute.snapshot.params.industry_id;
    this.initForm();
    this.getIndustry();
  }

  initForm(): void {
    this.form = this.fb.group({
      industry_id: [this.industry_id],
      industry_name: [null, [Validators.required]],
      sort: [null, [Validators.required, this.sortValidator]],
      is_use: [null, [Validators.required]],
    });
  }

  getIndustry(): void {
    this.http.get(this.apiConfig.urls.industry.detail, { industry_id: this.industry_id })
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.industry = res.data;
          this.form.patchValue({
            industry_name: this.industry.industry_name,
            sort: this.industry.sort,
            is_use: this.industry.is_use,
          });
        }
      })
  }

  submit(form: FormGroup): void {
    if (!this.submitting) {
      this.submitting = true;
      this.http.post(this.apiConfig.urls.industry.edit, form.value)
        .subscribe((res: any) => {
          if (res.code === 0) {
            if (res.data) {
              this.msg.success('编辑产业成功', { nzDuration: 2000 });
              setTimeout(() => this.router.navigateByUrl(`/industry/list`), 2500);
            } else {
              this.msg.success('编辑产业失败', { nzDuration: 2000 });
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
