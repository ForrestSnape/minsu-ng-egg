'use strict';

const Controller = require('egg').Controller;

class PassportController extends Controller {
    async login() {
        const ctx = this.ctx;
        const check = await ctx.service.passport.login(ctx.request.body);
        ctx.body = {
            code: 0,
            data: check
        };
        ctx.status = 200;
    }

    async register() {
        const ctx = this.ctx;
        const res = await ctx.service.passport.register(ctx.request.body);
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }
}

module.exports = PassportController;