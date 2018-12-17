'use strict';

module.exports = app => {
    const {
        INTEGER,
        STRING,
        TEXT,
        DECIMAL
    } = app.Sequelize;

    const Room = app.model.define('room', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: STRING(100),
        rent_month: DECIMAL(10, 2),
        photo: STRING(255),
        address: STRING(255),
        keywords: STRING(255),
        description: TEXT,
        status: INTEGER(3)
    }, {
        tableName: 'minsu_room',
        freezeTableName: true,
        timestamps: false,
    });

    return Room;
};