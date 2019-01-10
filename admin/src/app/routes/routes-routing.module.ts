import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
// layout
import { LayoutProComponent } from '../layout/pro/pro.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
import { DashboardAnalysisComponent } from './dashboard/analysis/analysis.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
import { UserLockComponent } from './passport/lock/lock.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutProComponent,
    children: [
      { path: '', redirectTo: 'dashboard/analysis', pathMatch: 'full' },
      { path: 'dashboard', redirectTo: 'dashboard/analysis', pathMatch: 'full' },
      { path: 'dashboard/analysis', component: DashboardAnalysisComponent },
      { path: 'town', loadChildren: './town/town.module#TownModule' },
      { path: 'album', loadChildren: './album/album.module#AlbumModule' },
      { path: 'industry', loadChildren: './industry/industry.module#IndustryModule' },
      { path: 'article', loadChildren: './article/article.module#ArticleModule' },
      { path: 'policy', loadChildren: './policy/policy.module#PolicyModule' },
      { path: 'user', loadChildren: './user/user.module#UserModule' },
      { path: 'order', loadChildren: './order/order.module#OrderModule' },
      { path: 'system', loadChildren: './system/system.module#SystemModule' },
    ],
  },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      {
        path: 'login',
        component: UserLoginComponent,
        data: { title: '登录', titleI18n: 'app.login.login' },
      },
      {
        path: 'register',
        component: UserRegisterComponent,
        data: { title: '注册', titleI18n: 'app.register.register' },
      },
      {
        path: 'register-result',
        component: UserRegisterResultComponent,
        data: { title: '注册结果', titleI18n: 'app.register.register' },
      },
      {
        path: 'lock',
        component: UserLockComponent,
        data: { title: '锁屏', titleI18n: 'app.lock' },
      },
    ],
  },
  // 单页不包裹Layout
  { path: 'callback/:type', component: CallbackComponent },
  { path: '403', component: Exception403Component },
  { path: '404', component: Exception404Component },
  { path: '500', component: Exception500Component },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
  exports: [RouterModule],
})
export class RouteRoutingModule { }
