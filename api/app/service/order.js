'use strict';

const Service = require('egg').Service;

class OrderService extends Service {
    // 获取订单列表
    async list(params) {
        const ctx = this.ctx;

        // 查询条件
        let condition = {};
        if (params.begin > 0) condition.begin = {
            $gte: params.begin
        };
        if (params.end > 0) condition.end = {
            $lte: params.end
        };
        if (params.room_id > 0) condition.room_id = {
            $eq: params.room_id
        };
        if (params.platform_id > 0) condition.platform_id = {
            $eq: params.platform_id
        };

        // 分页
        let limit = parseInt(params.ps);
        let offset = parseInt(params.ps * (params.pi - 1));

        let orders = await ctx.model.Order.findAll({
            where: condition,
            offset: offset,
            limit: limit,
            order: [
                ['begin', 'DESC']
            ],
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
        orders = orders.map(item => {
            item.begin = parseInt(item.begin) * 1000;
            item.end = parseInt(item.end) * 1000;
            return item;
        });
        let total = await ctx.model.Order.count({
            where: condition
        });

        return {
            orders: orders,
            total: total
        };
    }

    // 获取订单详情
    async detail(params) {
        const ctx = this.ctx;

        // 查询条件
        let condition = {
            id: {
                $eq: params.order_id
            }
        };

        let order = await ctx.model.Order.findOne({
            where: condition,
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
        if(order.comment){
            order.comment.comment_time = parseInt(order.comment.comment_time) * 1000;
        }

        return order;
    }

}
module.exports = OrderService;