/**
 * activity
 * 助力api部分
 */
import request from '@/utils/request'

/**
 * 获取助力列表
 * @param {obj} data 助力信息
 */
export function getActivityList(query) {
    let params = ''
    if(query.unionid)params += "&unionid="+query.unionid
    if(query.launchStatus)params += "&launchStatus="+query.launchStatus
    if(query.progressStatus)params += "&progressStatus="+query.progressStatus
    if(query.sort)params += "&sort="+query.sort
    return request({
        url: '/propertiesActivity?' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize + params,
        method: 'get'
    })
}

/**
 * 获取助力流水
 * @param {obj} query 查询参数
 */
export function getActivityLogList (query) {
    let params = ''
    if(query.type)params += "&type="+query.type
    return request({
        url: '/propertiesActivityFlow?activityId=' + query.activityId + '&pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize + params,
        method: 'get'
    })
}

/**
 * todo 获取助力评论
 * @param {obj} query 参数
 */
export function getActivityCommentList (query) {
    let params = ''
    if(query.type)params += "&type="+query.type
    return request({
        url: '/activityComment?' + 'pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize + params,
        method: 'get'
    })
}

/**
 * 修改楼盘助力信息
 * @param {obj} data 要修改的数据
 */
export function editActivity(data) {
    return request({
        url: '/background',
        method: 'put',
        data: data
    })
}

/**
 * 获取助力详情
 */
export function getActivity() {
    return request({
        url: '/background/2',
        method: 'get'
    })
}