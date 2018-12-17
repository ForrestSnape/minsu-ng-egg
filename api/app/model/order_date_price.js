'use strict';

module.exports = app => {
    const {
        INTEGER,
        DECIMAL
    } = app.Sequelize;

    const OrderDatePrice = app.model.define('minsu_order_date_price', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        order_id: INTEGER,
        begin: INTEGER,
        end: INTEGER,
        price: DECIMAL(10, 2)
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return OrderDatePrice;
};