'use strict';

const Service = require('egg').Service;

class PlatformService extends Service {
    // 获取平台列表
    async list() {
        const ctx = this.ctx;
        let platforms = await ctx.model.Platform.findAll();
        return platforms;
    }
}
module.exports = PlatformService;