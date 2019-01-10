import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PolicyRoutingModule } from './policy-routing.module';
import { PolicyListComponent } from './list/list.component';
import { PolicyAddComponent } from './add/add.component';
import { PolicyEditComponent } from './edit/edit.component';
import { UEditorModule } from 'ngx-ueditor';

const COMPONENTS = [
  PolicyListComponent,
  PolicyAddComponent,
  PolicyEditComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    PolicyRoutingModule,
    UEditorModule.forRoot({
      js: [
        `./assets/ueditor/ueditor.config.js`,
        `./assets/ueditor/ueditor.all.min.js`,
      ],
      // 默认前端配置项
      options: {
        UEDITOR_HOME_URL: './assets/ueditor/'
      }
    })
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class PolicyModule { }
