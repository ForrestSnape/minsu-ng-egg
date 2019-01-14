'use strict';

const Service = require('egg').Service;

class OrderService extends Service {
    // 获取订单列表
    async list(params) {
        const ctx = this.ctx;
        // 查询条件
        const where = {};
        if (ctx.session.user_id > 0) where.user_id = {
            $eq: ctx.session.user_id
        };
        if (params.begin > 0) where.begin = {
            $gte: params.begin
        };
        if (params.end > 0) where.end = {
            $lte: params.end
        };
        if (params.room_id > 0) where.room_id = {
            $eq: params.room_id
        };
        if (params.platform_id > 0) where.platform_id = {
            $eq: params.platform_id
        };
        // 分页
        const limit = parseInt(params.ps);
        const offset = parseInt(params.ps * (params.pi - 1));
        // 排序
        const order = [
            [params.order_by.split(',')[0], params.order_by.split(',')[1]]
        ];
        let orders = await ctx.model.Order.findAll({
            where: where,
            offset: offset,
            limit: limit,
            order: order,
            include: [{
                    model: ctx.model.Room,
                    attributes: ['id', 'name']
                },
                {
                    model: ctx.model.Platform,
                    attributes: ['id', 'name']
                },
            ]
        });
        const result = [];
        orders.forEach(item => {
            let order = item.dataValues;
            order.begin = parseInt(item.begin) * 1000;
            order.end = parseInt(item.end) * 1000;
            const curtime = (new Date()).getTime();
            result.push({ ...order,
                status: order.end < curtime ? 1 : item.begin <= curtime && curtime <= item.end ? 2 : 3
            });
        });
        const total = await ctx.model.Order.count({
            where: where
        });
        return {
            orders: result,
            total: total
        };
    }

    // 获取订单详情
    async detail(params) {
        const ctx = this.ctx;
        let order = await ctx.model.Order.findOne({
            where: {
                id: params.id
            },
            include: [{
                    model: ctx.model.Room,
                    attributes: ['id', 'name']
                },
                {
                    model: ctx.model.Platform,
                    attributes: ['id', 'name']
                },
                {
                    model: ctx.model.OrderDatePrice,
                    attributes: ['begin', 'end', 'price']
                },
                {
                    model: ctx.model.Comment,
                    attributes: ['star', 'comment', 'comment_time']
                },
            ]
        });

        // 时间转毫秒级
        order.begin = parseInt(order.begin) * 1000;
        order.end = parseInt(order.end) * 1000;
        order.order_date_prices = order.order_date_prices.map(item => {
            item.begin = parseInt(item.begin) * 1000;
            item.end = parseInt(item.end) * 1000;
            return item;
        });
        if (order.comment) {
            order.comment.comment_time = parseInt(order.comment.comment_time) * 1000;
        }

        return order;
    }

    // 添加订单
    async add(params) {
        const ctx = this.ctx;
        const check = await this.checkOrderForTime(params.room_id, {
            begin: params.begin,
            end: params.end
        });
        if (!check) return false;
        return await ctx.model.transaction(t => {
            params.user_id = ctx.session.user_id;
            return ctx.model.Order.create(params, {
                    transaction: t
                })
                .then(order => {
                    return ctx.model.OrderDatePrice.bulkCreate(params.date_price.map(item => {
                        item.order_id = order.id;
                        return item;
                    }), {
                        transaction: t
                    })
                })
        }).then(res => {
            return true;
        }).catch(err => {
            throw (err)
        })
    }

    // 编辑订单
    async edit(params) {
        const ctx = this.ctx;
        const check = await this.checkOrderForTime(params.room_id, {
            begin: params.begin,
            end: params.end
        });
        if (!check) return false;
        return await ctx.model.transaction(t => {
            // 修改订单表
            params.user_id = ctx.session.user_id;
            return ctx.model.Order.update(params, {
                where: {
                    id: params.id
                }
            }, {
                transaction: t
            }).then(res => {
                // 删除订单-日期-金额表数据
                return ctx.model.OrderDatePrice.destroy({
                    where: {
                        order_id: params.id
                    }
                })
            }, {
                transaction: t
            }).then(res => {
                // 重建订单-日期-金额表数据
                return ctx.model.OrderDatePrice.bulkCreate(params.date_price.map(item => {
                    item.order_id = params.id;
                    return item;
                }), {
                    transaction: t
                })
            })
        }).then(res => {
            return true;
        }).catch(err => {
            throw (err)
        })
    }

    // 删除订单
    async del(params) {
        const ctx = this.ctx;
        return await ctx.model.transaction(t => {
            return ctx.model.Order.destroy({
                    where: {
                        id: params.id
                    }
                }, {
                    transaction: t
                })
                .then(res => {
                    return ctx.model.OrderDatePrice.destroy({
                        where: {
                            order_id: params.id
                        }
                    })
                }, {
                    transaction: t
                })
        }).then(res => {
            return true;
        }).catch(err => {
            throw (err)
        })
    }

    // 批量操作
    async batch(params) {
        const ctx = this.ctx;
        switch (params.type) {
            // 批量删除
            case 1:
                return await ctx.model.transaction(t => {
                    return ctx.model.Order.destroy({
                            where: {
                                id: {
                                    $in: params.ids
                                }
                            }
                        }, {
                            transaction: t
                        })
                        .then(res => {
                            return ctx.model.OrderDatePrice.destroy({
                                where: {
                                    order_id: {
                                        $in: params.ids
                                    }
                                }
                            })
                        }, {
                            transaction: t
                        })
                }).then(res => {
                    return true;
                }).catch(err => {
                    throw (err)
                })
        }
    }

    // 检查某房间 指定时间段的订单能不呢插入 与原有订单时间段是否有交集
    async checkOrderForTime(room_id, date_range) {
        const ctx = this.ctx;
        let check = true;
        const orders = await ctx.model.Order.findAll({
            where: {
                room_id: room_id
            }
        });
        if (!orders) return check;
        // 房间所有订单 时间范围数组
        const orders_date_range = [];
        orders.forEach(order => {
            orders_date_range.push({
                begin: order.dataValues.begin,
                end: order.dataValues.end
            });
        });
        for (let i = 0; i < orders_date_range.length; i++) {
            if (!(date_range.end < orders_date_range[i].begin || date_range.begin > orders_date_range[i].end)) {
                check = false;
                break;
            }
        }
        return check;
    }
}
module.exports = OrderService;