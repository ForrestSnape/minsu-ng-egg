'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
    // 订单列表
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

    // 订单详情
    async detail() {
        const ctx = this.ctx;
        const res = await ctx.service.order.detail({
            order_id: ctx.query.order_id,
        });
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }

    // 添加订单
    async add(){
        const ctx = this.ctx;
        const res = await ctx.service.order.add(ctx.request.body);
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }
}

module.exports = OrderController;