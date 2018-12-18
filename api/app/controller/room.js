'use strict';

const Controller = require('egg').Controller;

class RoomController extends Controller {
    async list() {
        const ctx = this.ctx;
        const res = await ctx.service.room.list();
        // let res = [{label:'fdsf', value:1},{label:'fsadsafdsa', value:1}]
        ctx.body = {
            code: 0,
            data: res
        };
        ctx.status = 200;
    }
}

module.exports = RoomController;