'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }

  // alain初始化调用
  async start() {
    const ctx = this.ctx;
    try {
      const user = await ctx.service.passport.getUserById(ctx.session.user_id);
      const app = {
        description: "民宿助手",
        name: "民宿助手"
      };
      ctx.body = {
        status: 0,
        response: {
          app: app,
          user: user
        }
      };
    } catch (e) {
      ctx.body = {
        status: -1,
        msg: e.message
      };
    }
  }

}

module.exports = HomeController;