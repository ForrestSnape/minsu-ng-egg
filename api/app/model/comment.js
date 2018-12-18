'use strict';

module.exports = app => {
    const {
        INTEGER,
        TEXT
    } = app.Sequelize;

    const Comment = app.model.define('comment', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        room_id: INTEGER,
        order_id: INTEGER,
        star: INTEGER(2),
        comment: TEXT,
        comment_time: INTEGER
    }, {
        tableName: 'minsu_comment',
        freezeTableName: true,
        timestamps: false,
    });

    return Comment;
};