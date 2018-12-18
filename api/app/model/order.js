'use strict';

module.exports = app => {
    const {
        INTEGER,
        DECIMAL
    } = app.Sequelize;

    const Order = app.model.define('order', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        room_id: INTEGER,
        platform_id: INTEGER,
        begin: INTEGER,
        end: INTEGER,
        days: INTEGER,
        total_price: DECIMAL(10, 2),
        deduct_price: DECIMAL(10, 2),
        profit_price: DECIMAL(10, 2),
        customer_id: INTEGER
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