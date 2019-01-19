'use strict';

const Controller = require('egg').Controller;

class ChartController extends Controller {

    async orderM() {
        const ctx = this.ctx;
        const res = await ctx.service.chart.orderM(ctx.query);
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }

    async platformMY() {
        const ctx = this.ctx;
        const res = await ctx.service.chart.platformMY(ctx.query);
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }

    async orderY() {
        const ctx = this.ctx;
        const res = await ctx.service.chart.orderY(ctx.query);
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }

    async profitR() {
        const ctx = this.ctx;
        const res = await ctx.service.chart.profitR(ctx.query);
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }

    async profitP() {
        const ctx = this.ctx;
        const res = await ctx.service.chart.profitP(ctx.query);
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }

    async roomPlatform() {
        const ctx = this.ctx;
        const res = await ctx.service.chart.roomPlatform(ctx.query);
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }

    async roomOrder() {
        const ctx = this.ctx;
        const res = await ctx.service.chart.roomOrder(ctx.query);
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }
}

module.exports = ChartController;