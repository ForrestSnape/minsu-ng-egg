import { Component, TemplateRef, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {
  NzFormatEmitEvent,
  NzDropdownService,
  NzDropdownContextComponent,
  NzTreeNode,
  NzMessageService,
} from 'ng-zorro-antd';
import { ArrayService } from '@delon/util';
import { SFSchema } from '@delon/form';
import { ApiConfig } from 'app/config/api.config';

@Component({
  selector: 'system-module',
  templateUrl: './module.component.html',
})
export class SystemModuleComponent implements OnInit {
  private menuEvent: NzFormatEmitEvent;
  private contextMenu: NzDropdownContextComponent;

  modules: NzTreeNode[] = [];
  op: string;
  item: any;
  delDisabled = false;

  schema: SFSchema = {
    properties: {
      pname: { type: 'string', title: '上级模块', readOnly: true },
      name: { type: 'string', title: '模块名' },
      module: { type: 'string', title: '模块' },
      action: { type: 'string', title: '动作' },
      is_menu: { type: 'number', title: '菜单', enum: [{ value: 1, label: '是' }, { value: 0, label: '否' }], ui: { widget: 'radio' } },
    },
    required: ['name', 'module', 'is_menu'],
  };

  constructor(
    private http: _HttpClient,
    private ddSrv: NzDropdownService,
    private arrSrv: ArrayService,
    private msg: NzMessageService,
    private apiConfig: ApiConfig
  ) { }

  ngOnInit() {
    this.getModules();
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
          })
        }
      });
  }

  add(item: any) {
    this.closeContextMenu();
    this.op = 'add';
    const pname = item ? item.name : '';
    const pid = item ? item.id : 0;
    this.item = {
      pname: pname,
      name: '',
      pid: pid,
      module: '',
      action: '',
      is_menu: 0
    };
  }

  edit() {
    this.closeContextMenu();
    this.op = 'edit';
  }

  save(item: any) {
    const apiUrl = this.op === 'add' ? this.apiConfig.urls.system.module.add :
      this.op === 'edit' ? this.apiConfig.urls.system.module.edit :
        this.apiConfig.urls.system.module.add;
    this.http.post(apiUrl, item)
      .subscribe((res: any) => {
        if (res.code === 0) {
          if (this.op === 'add') {
            this.msg.success('添加模块成功');
            this.getModules();
            this.op = '';
          }
          if (this.op === 'edit') {
            this.msg.success('编辑模块成功');
            this.item = item;
            this.menuEvent.node.title = item.name;
            this.menuEvent.node.origin = item;
            this.op = 'view';
          }
        } else {
          this.getModules();
          this.op = '';
        }
      });
  }

  del() {
    this.closeContextMenu();
    if (this.item) {
      if (this.item.children.length > 0) {
        this.msg.warning(`【${this.item.name}】下有子模块，无法删除`);
        return;
      }
      this.http.delete(this.apiConfig.urls.system.module.del, { id: this.item.id })
        .subscribe((res: any) => {
          if (res.code === 0) {
            if (res.data) {
              this.msg.success('删除模块成功');
              this.getModules();
              this.op = '';
            }
          }
        });
    } else {
      this.msg.warning(`您未选中任何模块`);
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
    this.op = e.node.isSelected ? 'view' : '';
    this.item = e.node.origin;
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
