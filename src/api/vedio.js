import request from '@/utils/request'

export function getVedio(id) {
    return request({
        url: '/sku/' + id,
        method: 'get'
    })
}

/**
 * 获取教师列表
 * @param {obj} data 查询条件
 */
export function getVedioList(query) {
    var url = '/sku?init=true&' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
    if (query.curriculumId) {
        url += '&curriculumId=' + query.curriculumId
    }
    if (query.id) {
        url += '&id=' + query.id
    }
    return request({
            url: url,
            method: 'get'
        })
        // return request({
        //     url: '/teacher?init=true&' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize,
        //     method: 'get'
        // })
}

// 新增
export function postVedio(data) {
    return request({
        url: '/sku',
        method: 'post',
        data: data
    })
}
// 修改
export function putVedio(data) {
    return request({
        url: '/sku',
        method: 'put',
        data: data
    })
}
// 删除
export function deleteVedio(id) {
    return request({
        url: '/sku/' + id,
        method: 'delete'
    })
}