'use strict';

const Service = require('egg').Service;
const Crypto = require('crypto');

class PassportService extends Service {
    // 根据用户ID获取单个用户信息
    async getUserById(user_id) {
        return await this.app.model.User.findOne({
            where: {
                id: user_id
            },
            attributes: ['id', 'username', 'nickname', 'headimg', 'level', 'motto'],
        });
    }

    // 登录校验
    async login(params) {
        const username = params.username;
        const password = params.password;
        const passwd_md5 = Crypto.createHash('md5').update(password + this.config.salt).digest('hex');
        const user = await this.app.model.User.findOne({
            where: {
                username: username
            }
        });
        if (user && user.password === passwd_md5) {
            this.ctx.session.user_id = user.id;
            return true;
        } else {
            return false;
        }
    }

}
module.exports = PassportService;