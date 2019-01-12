'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
    // 订单列表
    async list() {
        const ctx = this.ctx;
        const res = await ctx.service.order.list(ctx.query);
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }

    // 订单详情
    async detail() {
        const ctx = this.ctx;
        const res = await ctx.service.order.detail(ctx.query);
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }

    // 添加订单
    async add() {
        const ctx = this.ctx;
        const res = await ctx.service.order.add(ctx.request.body);
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }

    // 编辑订单
    async edit() {
        const ctx = this.ctx;
        const res = await ctx.service.order.edit(ctx.request.body);
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }

    // 删除订单
    async del() {
        const ctx = this.ctx;
        const res = await ctx.service.order.del(ctx.query);
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }

    // 批量操作
    async batch() {
        const ctx = this.ctx;
        const res = await ctx.service.order.batch(ctx.request.body);
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }
}

module.exports = OrderController;