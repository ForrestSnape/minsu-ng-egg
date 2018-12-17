'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1545021351577_9232';

  // add your config here
  config.middleware = [];

  //支持跨域
  config.security = {
    csrf: {
        enable: false,
        ignoreJSON: true,
    },
    domainWhiteList: ['*']
  };
  config.cors = {
      origin:'*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // 盐
  config.salt = 'jfdosa$4dklsa3@E!';

  // token持续时间 单位：秒
  config.token = {
    duration: 7 * 24 * 60 * 60
  };

  // 数据库连接配置
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'minsu',
    username: 'root',
    password: 'root'
  };

  return config;
};