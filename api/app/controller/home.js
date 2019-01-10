'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }

  // alain初始化调用
  async start() {
    const user = await this.ctx.service.passport.getUserById(this.ctx.session.user_id);
    const app = {
      description: "内蒙古特色小镇-管理后台",
      name: "内蒙古特色小镇"
    }
    this.ctx.body = {
      app: app,
      user: user
    };
  }

}

module.exports = HomeController;