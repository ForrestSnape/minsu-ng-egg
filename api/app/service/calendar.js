'use strict';

const Service = require('egg').Service;

class CalendarService extends Service {
    // 根据用户ID获取其所有订单信息
    async orders() {
        const ctx = this.ctx;
        const orders = await ctx.model.Order.findAll({
            where: {
                user_id: ctx.session.user_id
            },
            include: [{
                    model: ctx.model.Room,
                    attributes: ['id', 'name']
                },
                {
                    model: ctx.model.Platform,
                    attributes: ['id', 'name']
                },
            ]
        });
        return orders.map(item => {
            let order = item.dataValues;
            order.begin = order.begin * 1000;
            order.end = order.end * 1000;
            const curtime = (new Date()).getTime();
            const classtype = order.end < curtime ? 'primary' : item.begin <= curtime && curtime <= item.end ? 'success' : 'warning'
            return {
                id: order.id,
                title: `${order.room.name} / ${order.platform.name} / ${new Date(order.begin).getMonth()+1}月${new Date(order.begin).getDate()}号-${new Date(order.end).getMonth()+1}月${new Date(order.end).getDate()}号`,
                start: this.getDateFormatByTimestamp(order.begin, 'day'),
                end: this.getDateFormatByTimestamp(order.end + 86400000, 'day'),
                className: `fc-event-${classtype}`
            };
        })
    }

    // 十位时间戳转日期格式
    getDateFormatByTimestamp(timestamp, type = 'min') {
        let date = new Date(timestamp);
        let year = date.getFullYear();
        let month = (date.getMonth() + 1 < 10 ? `0${(date.getMonth() + 1)}` : date.getMonth() + 1);
        let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        let min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        let sec = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

        switch (type) {
            case 'year':
                return `${year}`;
            case 'month':
                return `${year}-${month}`;
            case 'day':
                return `${year}-${month}-${day}`;
            case 'hour':
                return `${year}-${month}-${day} ${hour}:00`;
            case 'min':
                return `${year}-${month}-${day} ${hour}:${min}`;
            case 'sec':
                return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
        }
    }
}
module.exports = CalendarService;