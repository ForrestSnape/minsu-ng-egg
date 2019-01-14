'use strict';

const Controller = require('egg').Controller;

class RoomController extends Controller {
    async list() {
        const ctx = this.ctx;
        const res = await ctx.service.room.list();
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }

    async detail() {
        const ctx = this.ctx;
        const res = await ctx.service.room.detail(ctx.query);
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }

    async add() {
        const ctx = this.ctx;
        const res = await ctx.service.room.add(ctx.request.body);
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }

    async edit() {
        const ctx = this.ctx;
        const res = await ctx.service.room.edit(ctx.request.body);
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }

    async hasOrder() {
        const ctx = this.ctx;
        const res = await ctx.service.room.hasOrder(ctx.query);
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }

    async del() {
        const ctx = this.ctx;
        const res = await ctx.service.room.del(ctx.query);
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }
}

module.exports = RoomController;