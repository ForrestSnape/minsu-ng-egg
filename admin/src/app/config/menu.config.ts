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
                i18n: 'menu.main',
                group: true,
                hideInBreadcrumb: true,
                children: [{
                    text: '仪表盘',
                    i18n: 'menu.dashboard',
                    icon: 'anticon anticon-dashboard',
                    children: [{
                        text: '分析页',
                        link: '/dashboard/analysis',
                        i18n: 'menu.dashboard.analysis'
                    }]
                }, {
                    text: 'Room',
                    link: '/room',
                    i18n: 'menu.room',
                    icon: 'anticon anticon-home',
                    children: [{
                        text: 'Room Manager',
                        link: '/room/list',
                        i18n: 'menu.room.manager'
                    }]
                }, {
                    text: 'Order',
                    link: '/order',
                    i18n: 'menu.order',
                    icon: 'anticon anticon-dollar',
                    children: [{
                        text: 'Order Manager',
                        link: '/order/list',
                        i18n: 'menu.order.manager'
                    }]
                }]
            },
        ]

    }

}