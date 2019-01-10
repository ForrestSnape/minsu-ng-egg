import { Injectable } from '@angular/core';

// 权限相关配置
@Injectable()
export class RuleConfig {
    // 权限
    rules: any = {};

    constructor() {
        this.setRules();
    }

    setRules() {
        this.rules = {
            // 系统
            system: {
                // 模块管理
            },

            // 文章
            article: {
                // 文章列表
                list: 'articleList',
                // 添加文章
                add: 'articleAdd',
                // 编辑文章
                edit: 'articleEdit',
                // 删除文章
                del: 'articleDel',
                // 文章分类
                category: {
                    // 文章列表
                    list: 'articleCategoryList',
                    // 添加文章
                    add: 'articleCategoryAdd',
                    // 编辑文章
                    edit: 'articleCategoryEdit',
                    // 删除文章
                    del: 'articleCategoryDel',
                }
            }
        }
    }

}