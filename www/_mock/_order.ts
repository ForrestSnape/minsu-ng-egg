import { MockRequest } from '@delon/mock';

function genOrderData(params) {
    let list = [];
    for(let i =1;i<101;i++){
        list.push({
            'id':i,
            'room_id':rndNum(1,4)
        })
    }

    return {
        code: 0,
        data: list
    };
}

function rndNum(min, max) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

export const ORDER = {
    '/order/list': (req: MockRequest) => genOrderData(req.queryString.params)
};
