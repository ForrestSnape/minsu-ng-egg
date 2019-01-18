'use strict';

const Service = require('egg').Service;

class ChartService extends Service {

    async orders(params) {
        const ctx = this.ctx;
        const where = {
            user_id: {
                $eq: ctx.session.user_id
            }
        };
        if (params.room_id) {
            where.room_id = {
                $eq: params.room_id
            };
        }
        if (params.begin) {
            where.begin = {
                $gte: params.begin
            };
        }
        if (params.end) {
            where.end = {
                $lte: params.end
            };
        }
        return await ctx.model.Order.findAll({
            where: where,
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
            platforms.map(platform => {
                let name = platform.dataValues.name;
                let orders_num = 0;
                orders.map(order => {
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
            orders.map(item => {
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

    async profitR(params) {
        const ctx = this.ctx;
        const m = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let rooms = await ctx.model.Room.findAll({
            where: {
                user_id: ctx.session.user_id
            }
        });
        rooms = rooms.map(room => room.dataValues);
        const ret = [];
        for (let i = 0; i < m.length; i++) {
            let begin = Math.round(new Date(`${params.year}-${m[i]}-01 12:00:00`).getTime() / 1000);
            let end = Math.round(new Date(`${params.year}-${m[i]}-${new Date(params.year, m[i], 0).getDate()} 12:00:00`).getTime() / 1000);
            let orders = await this.orders({
                begin: begin,
                end: end
            });
            if (orders) orders = orders.map(order => order.dataValues);
            let temp = [];
            rooms.map(room => {
                let room_orders = orders.filter(order => order.room_id === room.id);
                let profit = 0;
                if (room_orders) {
                    room_orders.map(item => {
                        profit += Number(item.profit);
                    })
                }
                temp.push({
                    room: {
                        id: room.id,
                        name: room.name
                    },
                    profit: profit
                });
            })
            ret.push(temp);
        }
        const final = [];
        rooms.map(room => {
            final.push({
                room: {
                    id: room.id,
                    name: room.name
                },
                profit: ret.map(item => {
                    let profit = 0
                    item.map(item2 => {
                        if (item2.room.id === room.id) profit = item2.profit;
                    });
                    return profit;
                })
            })
        })
        return final;
    }

    async profitP(params) {
        const ctx = this.ctx;
        const m = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let platforms = await ctx.model.Platform.findAll();
        platforms = platforms.map(platform => platform.dataValues);
        const ret = [];
        for (let i = 0; i < m.length; i++) {
            let begin = Math.round(new Date(`${params.year}-${m[i]}-01 12:00:00`).getTime() / 1000);
            let end = Math.round(new Date(`${params.year}-${m[i]}-${new Date(params.year, m[i], 0).getDate()} 12:00:00`).getTime() / 1000);
            let orders = await this.orders({
                begin: begin,
                end: end
            });
            if (orders) orders = orders.map(order => order.dataValues);
            let temp = [];
            platforms.map(platform => {
                let platform_orders = orders.filter(order => order.platform_id === platform.id);
                let profit = 0;
                if (platform_orders) {
                    platform_orders.map(item => {
                        profit += Number(item.profit);
                    })
                }
                temp.push({
                    platform: {
                        id: platform.id,
                        name: platform.name
                    },
                    profit: profit
                });
            })
            ret.push(temp);
        }
        const final = [];
        platforms.map(platform => {
            final.push({
                platform: {
                    id: platform.id,
                    name: platform.name
                },
                profit: ret.map(item => {
                    let profit = 0
                    item.map(item2 => {
                        if (item2.platform.id === platform.id) profit = item2.profit;
                    });
                    return profit;
                })
            })
        })
        return final;
    }
}
module.exports = ChartService;