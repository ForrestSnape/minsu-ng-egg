'use strict';

const Controller = require('egg').Controller;

class PassportController extends Controller {
    async login() {
        try {
            const ctx = this.ctx;
            const check = await ctx.service.passport.login(ctx.request.body);
            ctx.body = {
                status: 0,
                response: check
            };
        } catch (e) {
            ctx.body = {
                status: -1,
                msg: e.message
            };
        }
    }

    async register() {
        try {
            const ctx = this.ctx;
            const res = await ctx.service.passport.register(ctx.request.body);
            ctx.body = {
                status: 0,
                response: res
            };
        } catch (e) {
            ctx.body = {
                status: -1,
                msg: e.message
            };
        }
    }
}

module.exports = PassportController;