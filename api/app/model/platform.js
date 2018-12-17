'use strict';

module.exports = app => {
    const {
        INTEGER,
        STRING
    } = app.Sequelize;

    const Platform = app.model.define('platform', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: STRING(50),
        photo: STRING(255),
        address_url: STRING(255)
    }, {
        tableName: 'minsu_platform',
        freezeTableName: true,
        timestamps: false,
    });

    return Platform;
};