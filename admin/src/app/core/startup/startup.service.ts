import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  MenuService,
  SettingsService,
  TitleService,
  ALAIN_I18N_TOKEN,
} from '@delon/theme';
import { ACLService } from '@delon/acl';
import { TranslateService } from '@ngx-translate/core';
import { I18NService } from '../i18n/i18n.service';

import { NzIconService } from 'ng-zorro-antd';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { ICONS } from '../../../style-icons';
import { MenuConfig } from 'app/config/menu.config';
import { ApiConfig } from 'app/config/api.config';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private translate: TranslateService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    private httpClient: HttpClient,
    private menuConfig: MenuConfig,
    private apiConfig: ApiConfig
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.apiConfig.urls.start)
        .pipe(
          // 接收其他拦截器后产生的异常消息
          catchError(appData => {
            resolve(null);
            return appData;
          }),
        )
        .subscribe(appData => {
          // application data
          const res: any = appData;
          // 应用信息：包括站点名、描述、年份
          this.settingService.setApp(res.app);
          // 用户信息：包括姓名、头像、邮箱地址
          this.settingService.setUser(res.user);
          // ACL：设置权限为全量
          this.aclService.setFull(true);
          // 初始化菜单
          // this.menuService.add(res.menu);
          this.menuService.add(this.menuConfig.menu);
          // 设置页面标题的后缀
          this.titleService.suffix = res.app.name;
        },
          () => { },
          () => {
            resolve(null);
          },
        );
    });
  }
}
