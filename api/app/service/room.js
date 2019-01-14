'use strict';

const Service = require('egg').Service;

class RoomService extends Service {
    // 获取房间列表
    async list() {
        const ctx = this.ctx;
        let rooms = await ctx.model.Room.findAll({
            where: {
                user_id: ctx.session.user_id
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
        if (await this.checkRoomName(ctx.session.user_id, params.name)) return false;
        params.user_id = ctx.session.user_id;
        return await ctx.model.Room.create(params);
    }

    // 编辑房间
    async edit(params) {
        const ctx = this.ctx;
        if (await this.checkRoomName(ctx.session.user_id, params.name)) return false;
        params.user_id = ctx.session.user_id;
        return await ctx.model.Room.update(params, {
            where: {
                id: params.id
            }
        });
    }

    // 检查某个用户房间名是否存在
    async checkRoomName(user_id, name) {
        const ctx = this.ctx;
        return await ctx.model.Room.findOne({
            where: {
                user_id: user_id,
                name: name
            }
        }) ? true : false;
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