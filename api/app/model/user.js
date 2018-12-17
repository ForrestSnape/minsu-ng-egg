'use strict';

module.exports = app => {
    const {
        STRING,
        INTEGER
    } = app.Sequelize;

    const User = app.model.define('minsu_user', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: STRING(255),
        nickname: STRING(255),
        password: STRING(255),
        headimg: STRING(255),
        level: STRING(255),
        motto: STRING(255),
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return User;
};