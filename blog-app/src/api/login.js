import request from '@/utils/request'
export var LoginByUsername = loginData => request.post('/login', loginData, 'application/json')
export var getUserInfo = loginData => request.get('/users/currentUser', loginData, 'application/json')
export var logout = loginData => request.get('/logout', loginData, 'application/json')
export var register = loginData => request.post('/register', loginData, 'application/json')