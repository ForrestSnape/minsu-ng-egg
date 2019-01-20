'use strict';

const Controller = require('egg').Controller;

class RoomController extends Controller {
    async list() {
        try {
            const ctx = this.ctx;
            const res = await ctx.service.room.list();
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

    async detail() {
        try {
            const ctx = this.ctx;
            const res = await ctx.service.room.detail(ctx.query);
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

    async add() {
        try {
            const ctx = this.ctx;
            const res = await ctx.service.room.add(ctx.request.body);
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

    async edit() {
        try {
            const ctx = this.ctx;
            const res = await ctx.service.room.edit(ctx.request.body);
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

    async hasOrder() {
        try {
            const ctx = this.ctx;
            const res = await ctx.service.room.hasOrder(ctx.query);
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

    async del() {
        try {
            const ctx = this.ctx;
            const res = await ctx.service.room.del(ctx.query);
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

module.exports = RoomController;