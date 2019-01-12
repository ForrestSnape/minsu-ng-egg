'use strict';

const Service = require('egg').Service;

class RoomService extends Service {
    // 获取房间列表
    async list(params) {
        const ctx = this.ctx;
        let rooms = await ctx.model.Room.findAll({
            where: {
                user_id: params.user_id
            }
        });
        return rooms;
    }

    // 获取房间详情
    async detail(params) {
        const ctx = this.ctx;
        let room = await ctx.model.Room.findOne({
            where: {
                id: params.id
            }
        });
        return room;
    }

    // 添加房间
    async add(params) {
        const ctx = this.ctx;
        // 检查房间名是否存在
        if (await ctx.model.Room.findOne({
                where: {
                    user_id: params.user_id,
                    name: params.name
                }
            })) {
            return false;
        }
        return await ctx.model.Room.create(params);
    }

    // 编辑房间
    async edit(params) {
        const ctx = this.ctx;
        // 检查房间名是否存在
        if (await ctx.model.Room.findOne({
                where: {
                    user_id: params.user_id,
                    name: params.name
                }
            })) {
            return false;
        }
        return await ctx.model.Room.update(params, {
            where: {
                id: params.id
            }
        });
    }

    // 检查房间下是否有订单
    async hasOrder(params) {
        const ctx = this.ctx;
        return await ctx.model.Order.findOne({
            where: {
                room_id: params.id
            }
        }) ? true : false;
    }

    // 删除房间
    async del(params) {
        const ctx = this.ctx;
        return await ctx.model.Room.destroy({
            where: {
                id: params.id
            }
        });
    }

}
module.exports = RoomService;