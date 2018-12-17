'use strict';

const Service = require('egg').Service;
const Crypto = require('crypto');

class PassportService extends Service {
    // 登录校验
    async login(params) {
        const ctx = this.ctx;
        const config = this.config;

        let username = params.username;
        let password = params.password;
        let passwd_md5 = Crypto.createHash('md5').update(password + config.salt).digest('hex');

        let user = await ctx.model.User.findOne({
            'where': {
                'username': username
            }
        });

        return user.password === passwd_md5 ? {
            code: 0,
            user: user
        } : {
            code: -1,
            msg: '用户名或密码不正确'
        };
    }

}
module.exports = PassportService;