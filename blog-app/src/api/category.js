import request from '@/utils/request'
export var getAllCategorysDetail = params => request.get('/categorys/detail', params, 'application/json')
export var getCategoryDetail = params => request.get('/categorys/detail', params, 'application/json')
export var getAllCategorys = params => request.get('/categorys', params, 'application/json')
// export function getCategory(id) {
//   return request({
//     url: `/categorys/${id}`,
//     method: 'get',
//   })
// }
