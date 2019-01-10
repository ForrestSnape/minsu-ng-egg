import { Component, ChangeDetectorRef } from '@angular/core';
import { _HttpClient, ScrollService } from '@delon/theme';
import { ApiConfig } from 'app/config/api.config';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'album-list',
  templateUrl: './list.component.html',
})
export class AlbumListComponent {
  towns: any;
  town_id: number;
  albums: any;
  total: number = 0;
  pi: number = Number(localStorage.getItem('albumlist_pi')) > 0 ? Number(localStorage.getItem('albumlist_pi')) : 1;
  ps: number = 12;
  search_text: string;
  constructor(
    private http: _HttpClient,
    private cd: ChangeDetectorRef,
    private scrollSrv: ScrollService,
    private apiConfig: ApiConfig,
    private router: Router,
    private msg: NzMessageService
  ) { }

  ngOnInit() {
    this.getTowns();
    this.getAlbums();
  }

  getAlbums() {
    const params = {
      pi: this.pi,
      ps: this.ps,
      town_id: this.town_id ? this.town_id : 0,
      search_text: this.search_text ? this.search_text : '',
    };
    this.http.get(this.apiConfig.urls.town.album.list, params)
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.albums = res.data.albumCategory.map(item => {
            if (item.cover) {
              item.cover = this.apiConfig.sourceAddr + item.cover;
            }
            return item;
          });
          this.total = res.data.total;
          this.scrollSrv.scrollToTop();
          this.cd.detectChanges();
        }
      })
  }

  getTowns() {
    this.http.get(this.apiConfig.urls.town.list, { pi: 1, ps: 12 })
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.towns = res.data.towns.map(item => ({ town_id: item.town_id, town_name: item.town_name }));
        }
      })
  }

  doSearch() {
    this.pi = 1;
    this.reloadListData();
  }

  doReset() {
    this.pi = 1;
    localStorage.setItem('albumlist_pi', String(this.pi));
    let town_id: number;
    this.town_id = town_id;
    let search_text: string;
    this.search_text = search_text;
    this.reloadListData();
  }

  // 重新加载列表数据
  reloadListData() {
    localStorage.setItem('albumlist_pi', String(this.pi));
    this.getAlbums();
  }

  addAlbum() {
    this.router.navigateByUrl('/album/add');
  }

  editAlbum(album_id) {
    this.router.navigateByUrl(`/album/edit/${album_id}`);
  }

  delAlbum(album_id): void {
    this.checkRelated(album_id).then(res => {
      if (!res) {
        this.http.delete(this.apiConfig.urls.town.album.del, { album_id: album_id })
          .subscribe((res: any) => {
            if (res.code === 0) {
              if (res.data) {
                this.msg.success('删除相册成功', { nzDuration: 2000 });
                setTimeout(() => this.reloadListData(), 2500);
              } else {
                this.msg.warning('删除相册失败');
              };
            }
          });
      } else {
        this.msg.warning('删除相册失败，请先删除相册内图片');
      }
    });
  }

  checkRelated(album_id: number): any {
    return new Promise(resolve => {
      this.http.get(this.apiConfig.urls.town.album.hasRelated, { album_id: album_id })
        .subscribe((res: any) => {
          if (res.code === 0) {
            resolve(res.data)
          }
        });
    });
  }

  image(album_id) {
    this.router.navigateByUrl(`/album/image/${album_id}`);
  }

}
