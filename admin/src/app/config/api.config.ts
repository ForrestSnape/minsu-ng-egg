import { Injectable } from '@angular/core';

// api请求url配置
@Injectable()
export class ApiConfig {
    // 静态资源url路径
    sourceAddr: string = 'http://localhost/nmgtsxz/';
    apiAddr: string = 'http://127.0.0.1:7002';
    urls: any = {};

    constructor() {
        this.setApiUrls();
    }

    setApiUrls() {
        this.urls = {
            start: this.apiAddr + '/start',

            passport: {
                login: this.apiAddr + '/login'
            },

            // 上传相关
            upload: {
                img: this.apiAddr + '/api/v1/upload/img?bucket=admin',
                file: this.apiAddr + '/api/v1/upload/file?bucket=admin',
            },

            // 房间相关
            room: {
                list: this.apiAddr + '/room/list',
                detail: this.apiAddr + '/room/detail',
                add: this.apiAddr + '/room/add',
                edit: this.apiAddr + '/room/edit',
                hasOrder: this.apiAddr + '/room/hasOrder',
                del: this.apiAddr + '/room/del'
            },

            // 平台相关
            platform: {
                list: this.apiAddr + '/platform/list'
            },

            // 订单相关
            order: {
                list: this.apiAddr + '/order/list',
                detail: this.apiAddr + '/order/detail',
                add: this.apiAddr + '/order/add',
                edit: this.apiAddr + '/order/edit',
                del: this.apiAddr + '/order/del',
                batch: this.apiAddr + '/order/batch',
            },

        }
    }

}