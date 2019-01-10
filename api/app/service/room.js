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

}
module.exports = RoomService;