'use strict';

const Service = require('egg').Service;

class OrderService extends Service {
    // 获取订单列表
    async list(params) {
        const ctx = this.ctx;
        ctx.model.Order.belongsTo(ctx.model.Room, {
            foreignKey: 'room_id'
        });
        ctx.model.Order.belongsTo(ctx.model.Platform, {
            foreignKey: 'platform_id'
        });
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
        let total = await ctx.model.Order.count({
            where: condition
        })

        return {
            orders: orders,
            total: total
        };
    }

}
module.exports = OrderService;