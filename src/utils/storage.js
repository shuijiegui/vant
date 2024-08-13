const KEY = 'BLUEJ55_VANT'

// 本地存储token值
export const setToken = (token) => { return localStorage.setItem(KEY, token) }

// 获取本地存储token值
export const getToken = () => { return localStorage.getItem(KEY) }

// 清除本地存储token值
export const removeToken = () => { return localStorage.removeItem(KEY) }
