'use strict';

// had enabled by egg
// exports.static = true;

// sequelize插件配置
exports.sequelize = {
    enable: true,
    package: 'egg-sequelize',
};

// 支持跨域
exports.cors = {
    enable: true,
    package: 'egg-cors',
};