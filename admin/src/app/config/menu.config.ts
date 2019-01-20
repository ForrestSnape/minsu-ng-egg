import { Injectable } from '@angular/core';
import { RuleConfig } from './rule.config';

// 菜单相关配置
@Injectable()
export class MenuConfig {
    // 菜单
    menu: any = [];

    constructor(
        private ruleConfig: RuleConfig
    ) {
        this.setMenu();
    }

    setMenu() {
        this.menu = [
            {
                text: '主导航',
                group: true,
                hideInBreadcrumb: true,
                children: [{
                    text: '仪表盘',
                    icon: 'anticon anticon-dashboard',
                    children: [{
                        text: '日历',
                        link: '/dashboard/calendar',
                    }]
                }, {
                    text: '房间',
                    link: '/room',
                    icon: 'anticon anticon-home',
                    children: [{
                        text: '房间管理',
                        link: '/room/list',
                    }]
                }, {
                    text: '订单',
                    link: '/order',
                    icon: 'anticon anticon-dollar',
                    children: [{
                        text: '订单管理',
                        link: '/order/list',
                    }]
                }, {
                    text: '图表',
                    link: '/chart',
                    icon: 'anticon anticon-line-chart',
                    children: [{
                        text: '房间',
                        link: '/chart/room',
                    }, {
                        text: '统计',
                        link: '/chart/statistic',
                    }]
                }]
            },
        ]

    }

}