'use strict';

const Service = require('egg').Service;

class RoomService extends Service {
    // 获取房间列表
    async list() {
        const ctx = this.ctx;
        let rooms = await ctx.model.Room.findAll();
        return rooms;
    }
}
module.exports = RoomService;