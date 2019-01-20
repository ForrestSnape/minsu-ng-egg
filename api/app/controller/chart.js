'use strict';

const Controller = require('egg').Controller;

class ChartController extends Controller {

    async orderM() {
        try {
            const ctx = this.ctx;
            const res = await ctx.service.chart.orderM(ctx.query);
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

    async platformMY() {
        try {
            const ctx = this.ctx;
            const res = await ctx.service.chart.platformMY(ctx.query);
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

    async orderY() {
        try {
            const ctx = this.ctx;
            const res = await ctx.service.chart.orderY(ctx.query);
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

    async profitR() {
        try {
            const ctx = this.ctx;
            const res = await ctx.service.chart.profitR(ctx.query);
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

    async profitP() {
        try {
            const ctx = this.ctx;
            const res = await ctx.service.chart.profitP(ctx.query);
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

    async roomPlatform() {
        try {
            const ctx = this.ctx;
            const res = await ctx.service.chart.roomPlatform(ctx.query);
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

    async roomOrder() {
        try {
            const ctx = this.ctx;
            const res = await ctx.service.chart.roomOrder(ctx.query);
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

module.exports = ChartController;