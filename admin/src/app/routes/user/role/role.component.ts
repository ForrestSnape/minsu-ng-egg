import { Component, TemplateRef, OnInit } from '@angular/core';
import { Menu, _HttpClient } from '@delon/theme';
import {
  NzFormatEmitEvent,
  NzDropdownService,
  NzDropdownContextComponent,
  NzTreeNode,
  NzFormatBeforeDropEvent,
  NzMessageService,
} from 'ng-zorro-antd';
import { ArrayService } from '@delon/util';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ApiConfig } from 'app/config/api.config';

@Component({
  selector: 'user-role',
  templateUrl: './role.component.html',
})
export class UserRoleComponent implements OnInit {
  private menuEvent: NzFormatEmitEvent;
  private contextMenu: NzDropdownContextComponent;

  roles: NzTreeNode[] = [];
  modules: NzTreeNode[];
  item: any;
  delDisabled: boolean = false;
  op: string;
  isSuperAdmin: boolean = false;

  constructor(
    private http: _HttpClient,
    private ddSrv: NzDropdownService,
    private arrSrv: ArrayService,
    private msg: NzMessageService,
    private apiConfig: ApiConfig
  ) { }

  ngOnInit() {
    this.getModules();
    this.getRoles();
  }

  private getModules() {
    this.http.get(this.apiConfig.urls.system.module.list)
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.modules = this.arrSrv.arrToTreeNode(res.data, {
            parentIdMapName: 'pid',
            titleMapName: 'name',
            cb: (item, parent, deep) => {
              item.expanded = deep <= 1;
            },
          });
        }
      });
  }

  private getRoles() {
    this.http.get(this.apiConfig.urls.user.role.list)
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.roles = this.arrSrv.arrToTreeNode(res.data, {
            parentIdMapName: 'pid',
            titleMapName: 'name',
            cb: (item, parent, deep) => {
              item.expanded = deep <= 1;
              item.ruleArr = item.rule.split(',').map(i => { if (i) return Number(i) });
            },
          })
        }
      });
  }

  add(item: any) {
    this.closeContextMenu();
    this.op = 'add';
    this.isSuperAdmin = false;
    const pname = item ? item.name : '';
    const pid = item ? item.id : 0;
    this.item = {
      pname: pname,
      name: '',
      pid: pid,
      rule: ''
    };
  }

  save() {
    const item = this.item;
    item.rule = this.arrSrv.getKeysByTreeNode(this.modules, { includeHalfChecked: false }).join(',');
    const apiUrl = this.op === 'add' ? this.apiConfig.urls.user.role.add :
      this.op === 'edit' ? this.apiConfig.urls.user.role.edit :
        this.apiConfig.urls.user.role.add;
    this.http.post(apiUrl, item)
      .subscribe((res: any) => {
        if (res.code === 0) {
          this.msg.success(`${this.op === 'add' ? '添加' : '编辑'}角色成功`);
          this.getRoles();
          this.item = null;
        }
      });
  }

  del() {
    this.closeContextMenu();
    if (this.item) {
      if (this.item.children.length > 0) {
        this.msg.warning(`【${this.item.name}】下有子角色，无法删除`);
        return;
      }
      this.http.delete(this.apiConfig.urls.user.role.del, { id: this.item.id })
        .subscribe((res: any) => {
          if (res.code === 0) {
            if (res.data) {
              this.msg.success('删除角色成功');
              this.getRoles();
              this.item = null;
              this.op = '';
            }
          }
        });
    } else {
      this.msg.warning(`您未选中任何角色`);
      return;
    }
  }

  get delMsg(): string {
    const childrenLen = this.menuEvent.node.children.length;
    if (childrenLen === 0) {
      return `确认删除【${this.menuEvent.node.title}】吗？`;
    }
    return `确认删除【${this.menuEvent.node.title}】以及所有子项吗？`;
  }

  show(e: NzFormatEmitEvent) {
    // 判断是否是超级管理员
    this.isSuperAdmin = e.node.origin.id === 1 ? true : false;
    this.menuEvent = e;
    this.item = e.node.origin;
    this.op = 'edit';
  }

  showContextMenu(e: NzFormatEmitEvent, tpl: TemplateRef<void>) {
    this.menuEvent = e;
    this.delDisabled = e.node.children.length !== 0;
    this.contextMenu = this.ddSrv.create(e.event, tpl);
  }

  closeContextMenu() {
    if (this.contextMenu) {
      this.contextMenu.close();
    }
  }
}
