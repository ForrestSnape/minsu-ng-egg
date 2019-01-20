'use strict';

const Service = require('egg').Service;
const Crypto = require('crypto');

class PassportService extends Service {
    // 根据用户ID获取单个用户信息
    async getUserById(id) {
        return await this.app.model.User.findOne({
            where: {
                id: id
            },
            attributes: ['id', 'username', 'nickname', 'headimg', 'level', 'motto'],
        });
    }

    // 登录校验
    async login(params) {
        const ctx = this.ctx;
        const username = params.username;
        const password = params.password;
        const passwd_md5 = Crypto.createHash('md5').update(password + this.config.salt).digest('hex');
        const user = await ctx.model.User.findOne({
            where: {
                username: username
            }
        });
        if (user && user.password === passwd_md5) {
            ctx.session.user_id = user.id;
            return true;
        } else {
            return false;
        }
    }

    // 注册
    async register(params) {
        const ctx = this.ctx;
        if (!(params.username && /^[A-Za-z0-9]+$/.test(params.username))) return {
            status: false,
            msg: '账户格式不正确'
        };
        if (!params.nickname) return {
            status: false,
            msg: '昵称必填'
        };
        if (!params.password) return {
            status: false,
            msg: '密码必填'
        };
        if (!params.invite_code) return {
            status: false,
            msg: '邀请码必填'
        };
        const user = await ctx.model.User.findOne({
            where: {
                username: params.username
            }
        });
        if (user) return {
            status: false,
            msg: '用户名已存在'
        };
        const invite = await ctx.model.Invite.findOne({
            where: {
                invite_code: params.invite_code
            }
        });
        if (!invite) return {
            status: false,
            msg: '邀请码不存在'
        };
        if (invite.user_id > 0) return {
            status: false,
            msg: '邀请码已被使用'
        };
        const res = await ctx.model.transaction(t => {
            let user_params = params;
            user_params.password = Crypto.createHash('md5').update(params.password + this.config.salt).digest('hex');
            user_params.headimg = '';
            user_params.level = 1;
            user_params.motto = '';
            return ctx.model.User.create(user_params, {
                    transaction: t
                })
                .then(user => {
                    return ctx.model.Invite.update({
                        user_id: user.id
                    }, {
                        where: {
                            invite_code: params.invite_code
                        }
                    }, {
                        transaction: t
                    })
                })
        }).then(res => {
            return true;
        }).catch(err => {
            throw (err)
        });
        return {
            status: res,
            msg: `注册${res ? '成功':'失败'}`
        };
    }

}
module.exports = PassportService;