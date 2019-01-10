'use strict';

const Service = require('egg').Service;

class PlatformService extends Service {
    async list() {
        const ctx = this.ctx;
        return await ctx.model.Platform.findAll();
    }
}
module.exports = PlatformService;