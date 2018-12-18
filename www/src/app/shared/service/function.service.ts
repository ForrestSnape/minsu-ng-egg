import { Injectable } from '@angular/core';

@Injectable()
export class FunctionService {
    constructor() {
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

    // 日期对象转时间戳
    // type 's'秒, 'ms'毫秒
    getTimeStampByDate(date: Date, time: string, type: string) {
        let timestamp = new Date(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + time).getTime();
        if (type === 's') {
            timestamp = Math.round(timestamp / 1000);
        }
        return timestamp;
    }
}