'use strict';

const sequelize = require('./config.sequelize');

module.exports = appInfo => {
  const config = exports = {};

  //端口号监听
  config.cluster = {
    listen: {
      path: '',
      port: 5300,
      hostname: '0.0.0.0',
    }
  };

  // cookie sign key
  config.keys = appInfo.name + '_#@$fkdlsa945#@_432@#!';

  //支持跨域
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['*']
  };
  config.cors = {
    credentials: true,
    origin: 'http://localhost:4200',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // 盐
  config.salt = 'jfdosa$4dklsa3@E!';

  // 数据库连接配置
  config.sequelize = sequelize;

  // 中间件
  config.middleware = ['checkLogin'];
  config.checkLogin = {
    ignore: ['/login', '/register']
  };

  return config;
};