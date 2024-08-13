import instance from '@/utils/request'

export const register = data => instance.post('/user/register', data)
export const Login = data => instance.post('/user/login', data)
export const getUserInfo = () => instance.get('/user/currentUser')
