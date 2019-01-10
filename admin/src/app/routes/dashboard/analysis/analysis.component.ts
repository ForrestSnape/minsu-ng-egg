import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { STColumn } from '@delon/abc';
import { getTimeDistance } from '@delon/util';
import { _HttpClient } from '@delon/theme';
import { I18NService } from '@core/i18n/i18n.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardAnalysisComponent implements OnInit {

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private i18n: I18NService,
    private cd: ChangeDetectorRef,
    private httpC:HttpClient
  ) { }

  ngOnInit() {
    
  }

  

  getCurUser(){
    this.http.get('http://127.0.0.1:5300/cur')
    .subscribe((res:any) => {
      console.dir(res)
    })
  }
}
