'use strict';

const Controller = require('egg').Controller;

class PassportController extends Controller {
    async login() {
        const check = await this.ctx.service.passport.login(this.ctx.request.body);
        this.ctx.body = {
            code: 0,
            data: check
        };
    }
}

module.exports = PassportController;