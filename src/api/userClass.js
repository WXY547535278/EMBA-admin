import request from '@/utils/request'

export function getOrder(id) {
    return request({
        url: '/order/' + id,
        method: 'get'
    })
}

/**
 * 获取登陆用户的信息
 * @param {*} query
 */

/**
 * 获取课程列表
 * @param {obj} data 查询条件
 */
export function getOrderList(query) {
    var url = '/order?init=true&' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
    if (query.openid) {
        url += '&openid=' + query.openid
    }
    if (query.obj) {
        url += '&obj=' + query.obj
    }
    return request({
        url: url,
        method: 'get'
    })
}

// 新增
export function postOrder(data) {
    return request({
        url: '/order',
        method: 'post',
        data: data
    })
}
// 修改
export function putOrder(data) {
    return request({
        url: '/order',
        method: 'put',
        data: data
    })
}
// 删除
export function deleteOrder(id) {
    return request({
        url: '/order/' + id,
        method: 'delete'
    })
}