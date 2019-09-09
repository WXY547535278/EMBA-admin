import request from '@/utils/request'

export function getSubject(id) {
    return request({
        url: '/subject/' + id,
        method: 'get'
    })
}

/**
 * 获取用户列表
 * @param {obj} data 查询条件
 */
export function getSubjectList(query) {
    var url = '/subject?pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
    if (query.type) {
        url += '&type=' + query.type
    }
    return request({
        url: url,
        method: 'get'
    })
}

// 新增
export function postSubject(data) {
    return request({
        url: '/subject',
        method: 'post',
        data: data
    })
}
// 修改
export function putSubject(data) {
    return request({
        url: '/subject',
        method: 'put',
        data: data
    })
}
// 删除
export function deleteSubject(id) {
    return request({
        url: '/subject/' + id,
        method: 'delete'
    })
}