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
        if (params.platform_id) {
            where.platform_id = {
                $eq: params.platform_id
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
            ret.total.push(total.toFixed(2));
            ret.profit.push(profit.toFixed(2));
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
                    profit: profit.toFixed(2)
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
                    profit: profit.toFixed(2)
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

    async roomPlatform(params) {
        const ctx = this.ctx;
        let rooms = await ctx.model.Room.findAll({
            where: {
                user_id: ctx.session.user_id
            }
        });
        rooms = rooms.map(room => room.dataValues);
        let platforms = await ctx.model.Platform.findAll();
        platforms = platforms.map(platform => platform.dataValues);
        const columns = [{
            title: '',
            index: 'room_name',
            className: 'text-center'
        }];
        platforms.map(platform => {
            columns.push({
                title: platform.name,
                index: `platform_${platform.id}`,
                className: 'text-center'
            });
        });
        columns.push({
            title: '合计',
            index: `room_all`,
            className: 'text-center'
        });
        let r_p = [];
        rooms.map(room => {
            platforms.map(platform => {
                r_p.push({
                    room_id: room.id,
                    platform_id: platform.id
                });
            })
        });
        let r_p_p = [];
        for (let i = 0; i < r_p.length; i++) {
            let orders = await this.orders({ ...params,
                ...r_p[i]
            });
            orders = orders.map(order => order.dataValues);
            let profit = 0;
            orders.map(order => {
                profit += Number(order.profit);
            });
            r_p_p[i] = { ...r_p[i],
                profit: profit.toFixed(2)
            };
        }
        const ret = [];
        rooms.map(room => {
            let temp = {
                room_name: room.name
            };
            let room_all = 0;
            r_p_p.filter(item => item.room_id === room.id).map(item => {
                temp[`platform_${item.platform_id}`] = item.profit;
                room_all += Number(item.profit);
            });
            temp.room_all = room_all.toFixed(2);
            ret.push(temp);
        });
        return {
            columns: columns,
            data: ret
        };
    }

    async roomOrder(params) {
        const ctx = this.ctx;
        let rooms = await ctx.model.Room.findAll({
            where: {
                user_id: ctx.session.user_id
            }
        });
        rooms = rooms.map(room => room.dataValues);
        const columns = [{
            title: '',
            index: 'room_name',
            className: 'text-center'
        }, {
            title: '订单数',
            index: 'num',
            className: 'text-center'
        }, {
            title: '天数',
            index: 'days',
            className: 'text-center'
        }, {
            title: '订单金额',
            index: 'total',
            className: 'text-center'
        }, {
            title: '利润',
            index: 'profit',
            className: 'text-center'
        }];
        const ret = [];
        for (let i = 0; i < rooms.length; i++) {
            let orders = await this.orders({ ...params,
                room_id: rooms[i].id
            });
            orders = orders.map(order => order.dataValues);
            let num = orders.length;
            let days = 0;
            let total = 0;
            let profit = 0;
            orders.map(order => {
                days += Number(order.days);
                total += Number(order.total);
                profit += Number(order.profit);
            })
            ret.push({
                room_name: rooms[i].name,
                num: num,
                days: days,
                total: total.toFixed(2),
                profit: profit.toFixed(2)
            });
        }
        return {
            columns: columns,
            data: ret
        };
    }
}
module.exports = ChartService;