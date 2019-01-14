import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { ApiConfig } from 'app/config/api.config';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'room-list',
  templateUrl: './list.component.html',
  styles: [
    `
      :host ::ng-deep .ant-card-meta-title {
        margin-bottom: 12px;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomListComponent implements OnInit {
  rooms: any;
  stars: Array<boolean> = [true, true, true, true, true];
  lol_addr: Array<string>;
  loading = false;
  addVisible: boolean = false;
  editVisible: boolean = false;
  add_form: FormGroup;
  edit_form: FormGroup;
  formatterCNY = value => `￥ ${value}`;
  parserCNY = value => value.replace('￥ ', '');
  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private cd: ChangeDetectorRef,
    private apiConfig: ApiConfig,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.setLolAddr();
    this.getRooms();
    this.initAddForm();
    this.initEditForm();
  }

  getRooms() {
    this.http.get(this.apiConfig.urls.room.list)
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.rooms = res.data.map(item => {
            if (item.rent <= 0) item.rent = '租金没填，大约每月999999999999'
            if (!item.address) item.address = `地址没填，大约位于 ${this.lol_addr[parseInt(String(Math.random() * 12))]}`;
            return item;
          });
          this.rooms.push(null);
          this.loading = false;
          this.cd.detectChanges();
        }
      });
  }

  setLolAddr() {
    this.lol_addr = [
      '比尔吉沃特', '艾欧尼亚', '虚空之地', '诺克萨斯', '巨神峰',
      '德玛西亚', '祖安', '皮尔特沃夫', '暗影岛', '恕瑞玛',
      '弗雷尔卓德', '班德尔城'
    ];
  }

  initAddForm() {
    this.add_form = this.fb.group({
      name: [null, [Validators.required]],
      rent: [0],
      address: [null]
    });
  }

  addRoom() {
    this.editVisible = false;
    this.addVisible = true;
  }

  addRoomClose() {
    this.addVisible = false;
  }

  addSubmit(form) {
    const params = form.value;
    params.address = params.address ? params.address : '';
    params.photo = '';
    params.keywords = '';
    params.description = '';
    this.http.post(this.apiConfig.urls.room.add, params)
      .subscribe((res: any) => {
        if (res.code === 0) {
          if (res.data) {
            this.msg.success('新增房间成功');
            this.addVisible = false;
            this.getRooms();
          } else {
            this.msg.warning('房间名称重复，新增失败')
          }
        }
      })
  }

  initEditForm() {
    this.edit_form = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      rent: [0],
      address: [null]
    });
  }

  editRoom(id) {
    this.addVisible = false;
    this.http.get(this.apiConfig.urls.room.detail, { id: id })
      .subscribe((res: any) => {
        if (res.code === 0) {
          const room = res.data;
          this.edit_form.patchValue({
            id: room.id,
            name: room.name,
            rent: room.rent,
            address: room.address
          })
          this.editVisible = true;
        }
      })
  }

  editRoomClose() {
    this.editVisible = false;
  }

  editSubmit(form) {
    const params = form.value;
    params.address = params.address ? params.address : '';
    params.photo = '';
    params.keywords = '';
    params.description = '';
    this.http.post(this.apiConfig.urls.room.edit, params)
      .subscribe((res: any) => {
        if (res.code === 0) {
          if (res.data) {
            this.msg.success('编辑房间成功');
            this.editVisible = false;
            this.getRooms();
          } else {
            this.msg.warning('房间名称重复，编辑失败')
          }
        }
      })
  }

  delRoom(id) {
    this.checkHasOrder(id).then(res => {
      if (!res) {
        this.loading = true;
        this.http.delete(this.apiConfig.urls.room.del, { id: id })
          .subscribe((res: any) => {
            if (res.code === 0) {
              if (res.data) {
                this.msg.success('删除房间成功');
                this.getRooms();
              } else {
                this.msg.warning('删除房间失败')
              };
            }
          });
      } else {
        this.msg.warning('此房间下已有订单，无法删除')
      }
    });
  }

  checkHasOrder(id) {
    return new Promise(resolve => {
      this.http.get(this.apiConfig.urls.room.hasOrder, { id: id })
        .subscribe((res: any) => {
          if (res.code === 0) {
            resolve(res.data)
          }
        });
    });
  }
}
