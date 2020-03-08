import request1 from '@/request'
import request from '@/utils/request'
export var getAllTags = params => request.get('/tags', params, 'application/json')
export var getAllTagsDetail = params => request.get('/tags/detail', params, 'application/json')
export var getHotTags = params => request.get('/tags/hot', params, 'application/json')
export var getTag = params => request.get('/tags', params, 'application/json')
export var getTagDetail = params => request.get('/tags/detail', params, 'application/json')


// export function getTag(id) {
//   return request1({
//     url: `/tags/${id}`,
//     method: 'get',
//   })
// }

// export function getTagDetail(id) {
//   return request1({
//     url: `/tags/detail/${id}`,
//     method: 'get',
//   })
// }
