import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleListComponent } from './list/list.component';
import { ArticleCategoryListComponent } from './category/category-list/category-list.component';
import { ArticleCategoryAddComponent } from './category/category-add/category-add.component';
import { ArticleCategoryEditComponent } from './category/category-edit/category-edit.component';
import { ArticleAddComponent } from './add/add.component';
import { ArticleEditComponent } from './edit/edit.component';
import { UEditorModule } from 'ngx-ueditor';

const COMPONENTS = [
  ArticleCategoryListComponent,
  ArticleCategoryAddComponent,
  ArticleCategoryEditComponent,
  ArticleListComponent,
  ArticleAddComponent,
  ArticleEditComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    ArticleRoutingModule,
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
export class ArticleModule { }
