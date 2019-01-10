'use strict';

module.exports = app => {
    const {
        INTEGER,
        DECIMAL
    } = app.Sequelize;

    const Order = app.model.define('order', {
        id: {
            type: INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: INTEGER(11),
        room_id: INTEGER(11),
        platform_id: INTEGER(11),
        begin: INTEGER(11),
        end: INTEGER(11),
        days: INTEGER(11),
        total: DECIMAL(10, 2),
        deduct: DECIMAL(10, 2),
        profit: DECIMAL(10, 2)
    }, {
        tableName: 'minsu_order',
        freezeTableName: true,
        timestamps: false,
    });

    // 定义关联关系
    Order.associate = () => {
        app.model.Order.belongsTo(app.model.Room, {
            foreignKey: 'room_id'
        });
        app.model.Order.belongsTo(app.model.Platform, {
            foreignKey: 'platform_id'
        });
        app.model.Order.hasMany(app.model.OrderDatePrice, {
            foreignKey: 'order_id'
        });
        app.model.Order.hasOne(app.model.Comment, {
            foreignKey: 'order_id'
        });
    }

    return Order;
};