import request from '@/utils/request'

export function getKefu(id) {
  return request({
    url: '/material/' + id,
    method: 'get'
  })
}

/**
 * 获取教师列表
 * @param {obj} data 查询条件
 */
export function getKefuList(query) {
  var url = 'material?type=1'
  return request({
    url: url,
    method: 'get'
  })
}

// 修改
export function putKefu(data) {
  return request({
    url: '/material',
    method: 'put',
    data: data
  })
}
