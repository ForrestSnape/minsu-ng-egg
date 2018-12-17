'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
    async list() {
        const ctx = this.ctx;
        const res = await ctx.service.order.list({
            pi: ctx.query.pi,
            ps: ctx.query.ps,
            begin: ctx.query.begin,
            end: ctx.query.end,
            room_id: ctx.query.room_id,
            platform_id: ctx.query.platform_id
        });
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }
}

module.exports = OrderController;