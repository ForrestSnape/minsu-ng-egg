'use strict';

module.exports = app => {
    const {
        INTEGER,
        DECIMAL
    } = app.Sequelize;

    const Order = app.model.define('minsu_order', {
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
        freezeTableName: true,
        timestamps: false,
    });

    return Order;
};