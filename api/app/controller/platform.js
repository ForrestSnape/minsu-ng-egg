'use strict';

const Controller = require('egg').Controller;

class PlatformController extends Controller {
    async list() {
        const ctx = this.ctx;
        const res = await ctx.service.platform.list();
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }

}

module.exports = PlatformController;