'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async changeNickname() {
        try {
            const ctx = this.ctx;
            const res = await ctx.service.user.changeNickname(ctx.request.body);
            ctx.body = {
                status: 0,
                response: res
            };
        } catch (e) {
            ctx.body = {
                status: -1,
                msg: e.message
            }
        }
    }

    async changePassword() {
        try {
            const ctx = this.ctx;
            const res = await ctx.service.user.changePassword(ctx.request.body);
            ctx.body = {
                status: 0,
                response: res
            };
        } catch (e) {
            ctx.body = {
                status: -1,
                msg: e.message
            }
        }
    }

}

module.exports = UserController;