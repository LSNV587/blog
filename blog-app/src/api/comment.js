import request from '@/utils/request'
export var getCommentsByArticle = pram => request.get(`/comments/article/${pram}`)
export var publishComment = pram => request.post('/comments/create/change', pram, 'application/json')
