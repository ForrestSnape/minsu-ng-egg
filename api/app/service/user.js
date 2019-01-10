'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    // 获取一个用户信息
    async getOne(id) {
        return await this.app.model.User.findOne({
            where: {
                id: id
            }
        });
    }

}
module.exports = UserService;