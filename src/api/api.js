import request from './request';

// export function getList(filter, page) {
//     return request({
//         url: 'list',
//         method: 'post',
//         data: { filter, page },

//     })
// }

export function getDetail(id) {
    return request({
        url: 'detail',
        method: 'post',
        data: { id },

    })
}

export function getList(filter, page) {

    return request({
        url: 'list',
        method: 'post',
        data: { filter, page },

    })
}