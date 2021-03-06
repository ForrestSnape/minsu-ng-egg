import { NgZone, ViewChild, ElementRef, Inject } from '@angular/core';
import { Theme, defineThemeSystem, OptionsInput, Calendar } from 'fullcalendar';
import { I18NService } from '@core/i18n/i18n.service';
import { ALAIN_I18N_TOKEN } from '@delon/theme';
import { take } from 'rxjs/operators';

export default class AntdTheme extends Theme { }

AntdTheme.prototype.classes = {
  widget: 'fc-unthemed',
  widgetHeader: 'fc-widget-header',
  widgetContent: 'fc-widget-content',

  tableGrid: 'ant-table',
  tableList: 'ant-table',

  buttonGroup: 'ant-btn-group',
  button: 'ant-btn ant-btn-default',
  cornerLeft: 'fc-corner-left',
  cornerRight: 'fc-corner-right',
  stateDefault: 'fc-state-default',
  stateActive: 'fc-state-active',
  stateDisabled: 'fc-state-disabled',
  stateHover: 'fc-state-hover',
  stateDown: 'fc-state-down',

  popoverHeader: 'fc-widget-header',
  popoverContent: 'fc-widget-content',

  // day grid
  headerRow: 'fc-widget-header',
  dayRow: 'fc-widget-content',

  // list view
  listView: 'fc-widget-content'
};

AntdTheme.prototype.baseIconClass = 'fc-icon'
AntdTheme.prototype.iconClasses = {
  close: 'fc-icon-x',
  prev: 'fc-icon-left-single-arrow',
  next: 'fc-icon-right-single-arrow',
  prevYear: 'fc-icon-left-double-arrow',
  nextYear: 'fc-icon-right-double-arrow'
}

AntdTheme.prototype.iconOverrideOption = 'buttonIcons'
AntdTheme.prototype.iconOverrideCustomButtonOption = 'icon'
AntdTheme.prototype.iconOverridePrefix = 'fc-icon-'

defineThemeSystem('antd', AntdTheme);

export class CalendarTheme {
  protected instance: Calendar;
  @ViewChild('calendar') protected readonly calendarEl: ElementRef;
  protected options: OptionsInput;

  constructor(private _ngZone: NgZone, @Inject(ALAIN_I18N_TOKEN) private _i18n: I18NService) { }

  protected init() {
    this._executeOnStable(() => {
      const options: OptionsInput = Object.assign({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: '',
        },
        editable: false,
        eventLimit: false,
        navLinks: false,
        locale: this._i18n.currentLang.toLocaleLowerCase(),
      }, this.options);
      (options as any).themeSystem = 'antd';

      this.instance = new Calendar(this.calendarEl.nativeElement, options);
      this.instance.render();
    });
  }

  protected destroy() {
    this._executeOnStable(() => {
      if (this.instance) this.instance.destroy();
    });
  }

  protected _executeOnStable(fn: () => any): void {
    if (this._ngZone.isStable) {
      fn();
    } else {
      this._ngZone.onStable.asObservable().pipe(take(1)).subscribe(fn);
    }
  }
}
