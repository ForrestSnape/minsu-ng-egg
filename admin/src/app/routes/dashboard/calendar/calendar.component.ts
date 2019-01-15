import {
  Component,
  ChangeDetectionStrategy,
  NgZone,
  OnDestroy,
  OnInit,
  Inject,
} from '@angular/core';
import { _HttpClient, ALAIN_I18N_TOKEN } from '@delon/theme';
import { I18NService } from '@core/i18n/i18n.service';
import { CalendarTheme } from './calendar.theme';
import { ApiConfig } from 'app/config/api.config';

@Component({
  selector: 'dashboard-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCalendarComponent extends CalendarTheme implements OnInit, OnDestroy {
  orders: any;
  constructor(
    private http: _HttpClient,
    zone: NgZone,
    @Inject(ALAIN_I18N_TOKEN) i18n: I18NService,
    private apiConfig: ApiConfig
  ) {
    super(zone, i18n);
  }

  private loadEvents(time: Date) {
    this.http.get(this.apiConfig.urls.calendar.orders)
      .subscribe((res: any) => {
        if (res.code === 0) {
          this._executeOnStable(() => {
            this.instance.addEventSource({
              allDayDefault: true,
              events: res.data,
            });
          });
        }
      });
  }

  ngOnInit() {
    this.init();
    this.loadEvents(new Date());
  }

  ngOnDestroy() {
    this.destroy();
  }
}
