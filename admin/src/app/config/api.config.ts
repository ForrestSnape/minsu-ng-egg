import { Injectable } from '@angular/core';

// api请求url配置
@Injectable()
export class ApiConfig {
    // 静态资源url路径
    // sourceAddr: string = 'http://localhost/nmgtsxz/';
    apiAddr: string = 'http://47.101.172.5:5300';
    // apiAddr: string = 'http://127.0.0.1:5300';
    urls: any = {};

    constructor() {
        this.setApiUrls();
    }

    setApiUrls() {
        this.urls = {
            start: this.apiAddr + '/start',

            passport: {
                login: this.apiAddr + '/login',
                register: this.apiAddr + '/register',
            },

            // 用户相关
            user: {
                changeNickname: this.apiAddr + '/user/changeNickname',
                changePassword: this.apiAddr + '/user/changePassword',
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

            // 日历相关
            calendar: {
                orders: this.apiAddr + '/calendar/orders',
            },

            // 图表相关
            chart: {
                orderM: this.apiAddr + '/chart/orderM',
                platformMY: this.apiAddr + '/chart/platformMY',
                orderY: this.apiAddr + '/chart/orderY',
                profitR: this.apiAddr + '/chart/profitR',
                profitP: this.apiAddr + '/chart/profitP',
                roomPlatform: this.apiAddr + '/chart/roomPlatform',
                roomOrder: this.apiAddr + '/chart/roomOrder',
            }
        }
    }

}