import request from '@/utils/request'

export function getInformation(id) {
    return request({
        url: '/information/' + id,
        method: 'get'
    })
}

/**
 * 获取用户列表
 * @param {obj} data 查询条件
 */
export function getInformationList(query) {
    var url = '/information?init=true&' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
        // if (query.title) {
        //     url += '&title=' + query.title
        // }
    return request({
            url: url,
            method: 'get'
        })
        // return request({
        //     url: '/information?init=true&' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize,
        //     method: 'get'
        // })
}

// 新增
export function postInformation(data) {
    return request({
        url: '/information',
        method: 'post',
        data: data
    })
}
// 修改
export function putInformation(data) {
    return request({
        url: '/information',
        method: 'put',
        data: data
    })
}
// 删除
export function deleteInformation(id) {
    return request({
        url: '/information/' + id,
        method: 'delete'
    })
}