import request from '@/utils/request'
export var getCommentsByArticle = pram => request.get('/comments/article', pram, 'application/json')
export var publishComment = pram => request.post('/comments/create/change', pram, 'application/json')


// export function getCommentsByArticle(id) {
//   return request({
//     url: `/comments/article/${id}`,
//     method: 'get'
//   })
// }

// export function publishComment(comment) {
//   return request({
//     url: '/comments/create/change',
//     method: 'post',
//     data: comment
//   })
// }

