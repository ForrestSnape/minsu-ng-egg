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
      description: "民宿助手",
      name: "民宿助手"
    }
    this.ctx.body = {
      app: app,
      user: user
    };
  }

}

module.exports = HomeController;