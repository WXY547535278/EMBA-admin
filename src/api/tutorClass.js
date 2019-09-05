import request from '@/utils/request'

export function getCurriculum(id) {
    return request({
        url: '/curriculum/' + id,
        method: 'get'
    })
}

/**
 * 获取课程列表
 * @param {obj} data 查询条件
 */
export function getCurriculumList(query) {
    return request({
        url: '/curriculum?init=true&' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize,
        method: 'get'
    })
}

// 新增
export function postCurriculum(data) {
    return request({
        url: '/curriculum',
        method: 'post',
        data: data
    })
}
// 修改
export function putCurriculum(data) {
    return request({
        url: '/curriculum',
        method: 'put',
        data: data
    })
}
// 删除
export function deleteCurriculum(id) {
    return request({
        url: '/curriculum/' + id,
        method: 'delete'
    })
}