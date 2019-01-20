'use strict';

const Controller = require('egg').Controller;

class OrderController extends Controller {
    // 订单列表
    async list() {
        try {
            const ctx = this.ctx;
            const res = await ctx.service.order.list(ctx.query);
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

    // 订单详情
    async detail() {
        try {
            const ctx = this.ctx;
            const res = await ctx.service.order.detail(ctx.query);
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

    // 添加订单
    async add() {
        try {
            const ctx = this.ctx;
            const res = await ctx.service.order.add(ctx.request.body);
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

    // 编辑订单
    async edit() {
        try {
            const ctx = this.ctx;
            const res = await ctx.service.order.edit(ctx.request.body);
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

    // 删除订单
    async del() {
        try {
            const ctx = this.ctx;
            const res = await ctx.service.order.del(ctx.query);
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

    // 批量操作
    async batch() {
        try {
            const ctx = this.ctx;
            const res = await ctx.service.order.batch(ctx.request.body);
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

module.exports = OrderController;