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
                    text: 'Order',
                    link: '/order',
                    i18n: 'menu.order',
                    icon: 'anticon anticon-dollar',
                    children: [{
                        text: 'Order Manager',
                        link: '/order/list',
                        i18n: 'menu.order.manager'
                    }]
                }, {
                    text: 'Town Manager',
                    link: '/town',
                    i18n: 'menu.town.manager',
                    icon: 'anticon anticon-home',
                    children: [{
                        text: 'Town List',
                        link: '/town/list',
                        i18n: 'menu.town.manager.list'
                    }, {
                        text: 'Album Manager',
                        link: '/album',
                        i18n: 'menu.album.manager'
                    },
                    {
                        text: 'Industry Manager',
                        link: '/industry',
                        i18n: 'menu.industry.manager'
                    }
                    ]
                }, {
                    text: 'Article Manager',
                    link: '/article',
                    i18n: 'menu.article.manager',
                    icon: 'anticon anticon-edit',
                    children: [{
                        text: 'Article List',
                        link: '/article/list',
                        i18n: 'menu.article.manager.list',
                        acl: this.ruleConfig.rules.article.list
                    },
                    {
                        text: 'Article Category Manager',
                        link: '/article/category',
                        i18n: 'menu.article.category.manager',
                    }]
                }, {
                    text: 'Policy Manager',
                    link: '/policy',
                    i18n: 'menu.policy.manager',
                    icon: 'anticon anticon-book',
                    children: [{
                        text: 'Policy List',
                        link: '/policy/list',
                        i18n: 'menu.policy.manager.list'
                    }]
                }, {
                    text: 'User Manager',
                    link: '/user',
                    i18n: 'menu.user.manager',
                    icon: 'anticon anticon-user',
                    children: [{
                        text: 'Admin User Manager',
                        link: '/user/admin-user',
                        i18n: 'menu.user.manager.admin-user'
                    }, {
                        text: 'Role Manager',
                        link: '/user/role',
                        i18n: 'menu.user.manager.role'
                    }]
                }, {
                    text: 'System Manager',
                    link: '/system',
                    i18n: 'menu.system.manager',
                    icon: 'anticon anticon-setting',
                    children: [{
                        text: 'Module Manager',
                        link: '/system/module',
                        i18n: 'menu.system.manager.module'
                    }]
                }]
            },
        ]

    }

}