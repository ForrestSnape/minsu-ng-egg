import { Injectable } from '@angular/core';

// api请求url配置
@Injectable()
export class ApiConfig {
    // 静态资源url路径
    sourceAddr: string = 'http://localhost/nmgtsxz/';
    apiAddr: string = 'http://127.0.0.1:5300';
    urls: any = {};
    orderBy: any = {};

    constructor() {
        this.setApiUrls();
        this.setApiOrderBy();
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
                list: this.apiAddr + '/room/list'
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

            // 地区相关
            area: {
                // 根据省份id获取城市信息
                getCityBy: this.apiAddr + '/api/v1/getCityBy',
            },

            // 文章相关
            article: {
                // 文章分类
                category: {
                    // 所有分类列表
                    list: this.apiAddr + '/api/v1/articleCategory/all',
                    // 单个分类及子节点
                    singleChild: this.apiAddr + '/api/v1/articleCategory/singleChild',
                    // 单个分类
                    single: this.apiAddr + '/api/v1/articleCategory/single',
                    // 是否有子分类
                    hasChild: this.apiAddr + '/api/v1/articleCategory/hasChild',
                    // 添加分类
                    add: this.apiAddr + '/api/v1/articleCategory/add',
                    // 编辑分类
                    edit: this.apiAddr + '/api/v1/articleCategory/edit',
                    // 删除分类
                    del: this.apiAddr + '/api/v1/articleCategory/del',
                    // 判断分类是否有关联数据(禁止删除)
                    hasRelated: this.apiAddr + '/api/v1/articleCategory/hasRelated',
                },
                // 文章列表
                list: this.apiAddr + '/api/v1/article/list',
                // 文章详情
                detail: this.apiAddr + '/api/v1/article/detail',
                // 添加文章
                add: this.apiAddr + '/api/v1/article/add',
                // 编辑文章
                edit: this.apiAddr + '/api/v1/article/edit',
                // 删除文章
                del: this.apiAddr + '/api/v1/article/del',
                // 文章批量操作
                batch: this.apiAddr + '/api/v1/article/batch',
            },

            // 政策相关
            policy: {
                // 政策列表
                list: this.apiAddr + '/api/v1/policy/list',
                // 政策详情
                detail: this.apiAddr + '/api/v1/policy/detail',
                // 添加政策
                add: this.apiAddr + '/api/v1/policy/add',
                // 编辑政策
                edit: this.apiAddr + '/api/v1/policy/edit',
                // 删除政策
                del: this.apiAddr + '/api/v1/policy/del',
                // 政策批量操作
                batch: this.apiAddr + '/api/v1/policy/batch',
            },

            // 小镇相关
            town: {
                // 小镇列表
                list: this.apiAddr + '/api/v1/town/list',
                // 相册相关
                album: {
                    // 相册列表
                    list: this.apiAddr + '/api/v1/albumCategory/list',
                    // 单个相册详情
                    detail: this.apiAddr + '/api/v1/albumCategory/detail',
                    // 添加相册
                    add: this.apiAddr + '/api/v1/albumCategory/add',
                    // 编辑相册
                    edit: this.apiAddr + '/api/v1/albumCategory/edit',
                    // 删除相册
                    del: this.apiAddr + '/api/v1/albumCategory/del',
                    // 判断相册是否有关联数据
                    hasRelated: this.apiAddr + '/api/v1/albumCategory/hasRelated',
                }
            },

            // 产业相关
            industry: {
                // 产业列表
                list: this.apiAddr + '/api/v1/industry/list',
                // 产业详情
                detail: this.apiAddr + '/api/v1/industry/detail',
                // 添加产业
                add: this.apiAddr + '/api/v1/industry/add',
                // 编辑产业
                edit: this.apiAddr + '/api/v1/industry/edit',
                // 删除产业
                del: this.apiAddr + '/api/v1/industry/del',
                // 判断产业是否有关联数据(禁止删除)
                hasRelated: this.apiAddr + '/api/v1/industry/hasRelated',
            },

            // 用户相关
            user: {
                // 后台用户相关
                adminUser: {
                    // 后台用户列表
                    list: this.apiAddr + '/api/v1/admin/user/list',
                    // 单个后台用户详情
                    detail: this.apiAddr + '/api/v1/admin/user/detail',
                    // 添加后台用户
                    add: this.apiAddr + '/api/v1/admin/user/add',
                    // 编辑后台用户
                    edit: this.apiAddr + '/api/v1/admin/user/edit',
                    // 删除后台用户
                    del: this.apiAddr + '/api/v1/admin/user/del',
                    // 后台用户批量操作
                    batch: this.apiAddr + '/api/v1/admin/user/batch',
                },
                // 角色相关
                role: {
                    // 角色列表
                    list: this.apiAddr + '/api/v1/role/list',
                    // 添加角色
                    add: this.apiAddr + '/api/v1/role/add',
                    // 编辑角色
                    edit: this.apiAddr + '/api/v1/role/edit',
                    // 删除角色
                    del: this.apiAddr + '/api/v1/role/del',
                }
            },

            // 系统相关
            system: {
                // 模块相关
                module: {
                    // 模块列表
                    list: this.apiAddr + '/api/v1/module/list',
                    // 添加模块
                    add: this.apiAddr + '/api/v1/module/add',
                    // 编辑模块
                    edit: this.apiAddr + '/api/v1/module/edit',
                    // 删除模块
                    del: this.apiAddr + '/api/v1/module/del',
                },
            }
        }
    }

    setApiOrderBy() {
        this.orderBy = {
            'create_time descend': 1,
            'create_time ascend': 2,
            'clicks descend': 3,
            'clicks ascend': 4,
            'publish_time descend': 5,
            'publish_time ascend': 6,
        }
    }
}