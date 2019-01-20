'use strict';

const Controller = require('egg').Controller;

class CalendarController extends Controller {
    async orders() {
        try {
            const ctx = this.ctx;
            const res = await ctx.service.calendar.orders();
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

module.exports = CalendarController;