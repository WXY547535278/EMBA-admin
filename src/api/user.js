import request from '@/utils/request'

/**
 * todo 楼盘用户管理
 */

/**
 * 管理员登录
 * @param {obj} data 管理员信息
 */
export function login(data) {
    return request({
        url: '/admin/login',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: {
            token
        }
    })
}

export function logout() {
    return request({
        url: '/admin/logout',
        method: 'post'
    })
}

/**
 * 获取用户列表
 * @param {obj} data 查询条件
 */
export function getUserList(query) {
    var url = '/user?' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
    if (query.name) {
        url += '&name=' + query.name
    }
    if (query.phone) {
        url += '&phone=' + query.phone
    }
    if (query.openid) {
        url += '&openid=' + query.openid
    }
    return request({
            url: url,
            method: 'get'
        })
        // return request({
        //   url: '/user?' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize,
        //   method: 'get'
        // })
}

// 通过id获取用户列表
export function getClassById(id) {
    return request({
        url: '/curriculum?openid=' + id,
        method: 'get'
    })
}

// 删除用户
export function delUser(unionid) {
    return request({
        url: '/user/' + unionid,
        method: 'delete'
    })
}