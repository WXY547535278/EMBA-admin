import request from '@/utils/request'

export function getChapter(id) {
    return request({
        url: '/chapter/' + id,
        method: 'get'
    })
}

/**
 * 获取列表
 * @param {obj} data 查询条件
 */
export function getChapterList(query) {
    var url = '/chapter?init=true&' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize
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
// 根据课程id获取章节视频列表
export function getVedioList(id) {
    var url = '/sku?chapterId=' + id
    return request({
        url: url,
        method: 'get'
    })
}
// 新增
export function postChapter(data) {
    return request({
        url: '/chapter',
        method: 'post',
        data: data
    })
}
// 修改
export function putChapter(data) {
    return request({
        url: '/chapter',
        method: 'put',
        data: data
    })
}
// 删除
export function deleteChapter(id) {
    return request({
        url: '/chapter/' + id,
        method: 'delete'
    })
}