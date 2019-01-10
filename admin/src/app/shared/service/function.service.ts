import { Injectable } from '@angular/core';

@Injectable()
export class FunctionService {
    constructor() {

    }

    // 根据当前时间获取当日指定时间
    getCurDayWithTime(date, timeStr) {
        let year = date.getFullYear();
        let month = (date.getMonth() + 1 < 10 ? `0${(date.getMonth() + 1)}` : date.getMonth() + 1);
        let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        return new Date(`${year}-${month}-${day} ${timeStr}`);
    }

    // 十位时间戳转日期格式
    getDateFormatByTimestamp(timestamp: number, type = 'min') {
        let date = new Date(timestamp * 1000);
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

    // 日期对象转时间戳
    // type 's'秒, 'ms'毫秒
    getTimeStampByDate(date: Date, time: string, type: string) {
        let timestamp = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + time).getTime();
        if (type === 's') {
            timestamp = Math.round(timestamp / 1000);
        }
        return timestamp;
    }

    // 获取两个日期之间的所有日期对象
    getDateList(startDate, endDate) {
        let dateList = [];
        // 这两个定义看似废话 其实避免了对传入参数的直接修改 这个bug找了半天
        let s = new Date(startDate); // let s = startDate;就是错误的 因为这样仍然是对同一对象的引用
        let e = new Date(endDate);
        dateList.push(new Date(s));
        while (true) {
            s.setDate(s.getDate() + 1);
            if (s.getTime() < e.getTime()) {
                dateList.push(new Date(s));
            } else {
                break;
            }
        }
        dateList.push(new Date(e));
        return dateList;
    }
}