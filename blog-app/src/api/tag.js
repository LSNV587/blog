import request from '@/utils/request'
export var getAllTags = params => request.get('/tags', params, 'application/json')
export var getAllTagsDetail = params => request.get('/tags/detail', params, 'application/json')
export var getHotTags = params => request.get('/tags/hot', params, 'application/json')
export var getTag = params => request.get('/tags', params, 'application/json')
export var getTagDetail = params => request.get('/tags/detail', params, 'application/json')

