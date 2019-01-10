import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumListComponent } from './list/list.component';
import { AlbumAddComponent } from './add/add.component';
import { AlbumEditComponent } from './edit/edit.component';
import { AlbumImageComponent } from './image/image.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: AlbumListComponent },
  { path: 'add', component: AlbumAddComponent },
  { path: 'edit/:album_id', component: AlbumEditComponent },
  { path: 'image/:album_id', component: AlbumImageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
