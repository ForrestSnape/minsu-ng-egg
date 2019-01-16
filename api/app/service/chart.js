'use strict';

const Service = require('egg').Service;

class ChartService extends Service {

    async orders(params) {
        const ctx = this.ctx;
        return await ctx.model.Order.findAll({
            where: {
                user_id: {
                    $eq: ctx.session.user_id
                },
                room_id: {
                    $eq: params.room_id
                },
                begin: {
                    $gte: params.begin
                },
                end: {
                    $lte: params.end
                }
            },
            order: [
                ['begin', 'asc']
            ],
            include: [{
                    model: ctx.model.Room,
                    attributes: ['id', 'name']
                },
                {
                    model: ctx.model.Platform,
                    attributes: ['id', 'name']
                }
            ]
        });
    }

    async orderM(params) {
        return await this.orders(params);
    }

    async platformMY(params) {
        const ctx = this.ctx;
        const ret = [];
        const orders = await this.orders(params);
        if (orders.length > 0) {
            const platforms = await ctx.model.Platform.findAll();
            platforms.forEach(platform => {
                let name = platform.dataValues.name;
                let orders_num = 0;
                orders.forEach(order => {
                    if (order.platform_id === platform.dataValues.id) orders_num++;
                });
                ret.push({
                    name: name,
                    value: orders_num
                });
            });
        }
        return ret;
    }

    async orderY(params) {
        const m = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const ret = {
            num: [],
            days: [],
            total: [],
            profit: []
        };
        for (let i = 0; i < m.length; i++) {
            let begin = Math.round(new Date(`${params.year}-${m[i]}-01 12:00:00`).getTime() / 1000);
            let end = Math.round(new Date(`${params.year}-${m[i]}-${new Date(params.year, m[i], 0).getDate()} 12:00:00`).getTime() / 1000);
            let orders = await this.orders({
                room_id: params.room_id,
                begin: begin,
                end: end
            });
            let num = 0;
            let days = 0;
            let total = 0;
            let profit = 0;
            orders.forEach(item => {
                let order = item.dataValues;
                num++;
                days += Number(order.days);
                total += Number(order.total);
                profit += Number(order.profit);
            });
            ret.num.push(num);
            ret.days.push(days);
            ret.total.push(total);
            ret.profit.push(profit);
        }
        return ret;
    }
}
module.exports = ChartService;