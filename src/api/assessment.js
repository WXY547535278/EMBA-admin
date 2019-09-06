import request from '@/utils/request'

export function getAssessment(id) {
    return request({
        url: '/consultation/' + id,
        method: 'get'
    })
}

/**
 * 获取入学评估列表
 * @param {obj} data 查询条件
 */
export function getAssessmentList(query) {
    return request({
        url: '/consultation?init=true&' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize,
        method: 'get'
    })
}
// 修改
export function putAssessment(data) {
    return request({
        url: '/consultation',
        method: 'put',
        data: data
    })
}
// 删除
export function deleteAssessment(id) {
    return request({
        url: '/consultation/' + id,
        method: 'delete'
    })
}