'use strict';

const Service = require('egg').Service;
const Crypto = require('crypto');

class UserService extends Service {
    // 获取一个用户信息
    async getOne(id) {
        return await this.app.model.User.findOne({
            where: {
                id: id
            }
        });
    }

    // 修改昵称
    async changeNickname(params) {
        const ctx = this.ctx;
        return await this.app.model.User.update(params, {
            where: {
                id: ctx.session.user_id
            }
        });
    }

    // 修改密码
    async changePassword(params) {
        const ctx = this.ctx;
        const user = await this.getOne(ctx.session.user_id);
        const passwordOld = Crypto.createHash('md5').update(params.passwordOld + this.config.salt).digest('hex');
        if (!(user && user.password === passwordOld)) {
            return {
                status: false,
                msg: '原密码不正确'
            }
        }
        const password = Crypto.createHash('md5').update(params.password + this.config.salt).digest('hex');
        const status = await this.app.model.User.update({
            password: password
        }, {
            where: {
                id: ctx.session.user_id
            }
        });
        return {
            status: status,
            msg: `修改密码${status?'成功':'失败'}`
        }
    }

}
module.exports = UserService;