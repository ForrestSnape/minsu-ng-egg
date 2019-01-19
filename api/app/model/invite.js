'use strict';

module.exports = app => {
    const {
        STRING,
        INTEGER
    } = app.Sequelize;

    const Invite = app.model.define('minsu_user', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        invite_code: STRING(20),
        user_id: INTEGER(11)
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return Invite;
};