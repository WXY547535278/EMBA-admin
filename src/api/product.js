import request from '@/utils/request'



export function getProduct(id) {
  return request({
    url: '/product/' +id,
    method: 'get'
  })
}

/**
 * 获取用户列表
 * @param {obj} data 查询条件
 */
export function getProductList(query) {
  var url = '/product?pageIndex=' + query.pageIndex + '&pageSize=' + query.pageSize;

  if(query.name){
    url += "&name="+query.name;
  }
  return request({
    url: url,
    method: 'get'
  })
}

// 新增
export function postProduct(data) {
  return request({
    url: '/product' ,
    method: 'post',
    data:data
  })
}
// 修改
export function putProduct(data) {
  return request({
    url: '/product' ,
    method: 'put',
    data:data
  })
}
// 删除
export function deleteProduct(id) {
  return request({
    url: '/product/' + id,
    method: 'delete'
  })
}
