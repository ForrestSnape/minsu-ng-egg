'use strict';

const Controller = require('egg').Controller;

class PlatformController extends Controller {
    async list() {
        try {
            const ctx = this.ctx;
            const res = await ctx.service.platform.list();
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

module.exports = PlatformController;