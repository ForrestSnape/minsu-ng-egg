import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleCategoryListComponent } from './category/category-list/category-list.component';
import { ArticleCategoryAddComponent } from './category/category-add/category-add.component';
import { ArticleCategoryEditComponent } from './category/category-edit/category-edit.component';
import { ArticleListComponent } from './list/list.component';
import { ArticleAddComponent } from './add/add.component';
import { ArticleEditComponent } from './edit/edit.component';
import { ACLGuard } from '@delon/acl';
import { RuleConfig } from 'app/config/rule.config';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ArticleListComponent, canActivate: [ACLGuard], data: { guard: (new RuleConfig()).rules.article.list } },
  { path: 'add', component: ArticleAddComponent, canActivate: [ACLGuard], data: { guard: (new RuleConfig()).rules.article.add } },
  { path: 'edit/:article_id', component: ArticleEditComponent, canActivate: [ACLGuard], data: { guard: (new RuleConfig()).rules.article.edit } },
  { path: 'category', redirectTo: 'category/list', pathMatch: 'full' },
  { path: 'category/list', component: ArticleCategoryListComponent, canActivate: [ACLGuard], data: { guard: (new RuleConfig()).rules.article.category.list } },
  { path: 'category/add', component: ArticleCategoryAddComponent, canActivate: [ACLGuard], data: { guard: (new RuleConfig()).rules.article.category.add } },
  { path: 'category/edit/:category_id', component: ArticleCategoryEditComponent, canActivate: [ACLGuard], data: { guard: (new RuleConfig()).rules.article.category.edit } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
