'use strict';

const Controller = require('egg').Controller;

class PassportController extends Controller {
    async login() {
        const res = await this.ctx.service.passport.login({
            username: this.ctx.query.username,
            password: this.ctx.query.password
        });
        if (res.code === 0) {
            this.ctx.body = {
                code: 0,
                user: res.user
            };
            this.ctx.status = 200;
        } else {
            this.ctx.body = {
                code: res.code,
                data: res.msg
            };
            this.ctx.status = 401;
        }
    }
}

module.exports = PassportController;