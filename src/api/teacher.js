import request from '@/utils/request'

export function getTeacher(id) {
    return request({
        url: '/teacher/' + id,
        method: 'get'
    })
}

/**
 * 获取课程列表
 * @param {obj} data 查询条件
 */
export function getTeacherList(query) {
    return request({
        url: '/teacher?init=true&' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize,
        method: 'get'
    })
}

// 新增
export function postTeacher(data) {
    return request({
        url: '/teacher',
        method: 'post',
        data: data
    })
}
// 修改
export function putTeacher(data) {
    return request({
        url: '/teacher',
        method: 'put',
        data: data
    })
}
// 删除
export function deleteTeacher(id) {
    return request({
        url: '/teacher/' + id,
        method: 'delete'
    })
}