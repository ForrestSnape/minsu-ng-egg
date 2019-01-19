'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async changeNickname() {
        const ctx = this.ctx;
        const res = await ctx.service.user.changeNickname(ctx.request.body);
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }

    async changePassword() {
        const ctx = this.ctx;
        const res = await ctx.service.user.changePassword(ctx.request.body);
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }

}

module.exports = UserController;