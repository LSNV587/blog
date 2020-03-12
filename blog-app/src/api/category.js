import request from '@/utils/request'
export var getAllCategorysDetail = params => request.get('/categorys/detail', params, 'application/json')
export var getCategoryDetail = params => request.get('/categorys/detail', params, 'application/json')
export var getAllCategorys = params => request.get('/categorys', params, 'application/json')


// export function getAllCategorys() {
//   return request({
//     url: '/categorys',
//     method: 'get',
//   })
// }

// export function getAllCategorysDetail() {
//   return request({
//     url: '/categorys/detail',
//     method: 'get',
//   })
// }

export function getCategory(id) {
  return request({
    url: `/categorys/${id}`,
    method: 'get',
  })
}

// export function getCategoryDetail(id) {
//   return request({
//     url: `/categorys/detail/${id}`,
//     method: 'get',
//   })
// }
