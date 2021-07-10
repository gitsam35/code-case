import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

http.interceptors.request.use(function(config) {
    // 拦截所有请求,有token ,在请求头加 token 与服务器上的 token 进行校验
    if (sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + sessionStorage.token
    }
    return config;
}, function(error) {
    return Promise.reject(error);
});

//  interceptors axios里的拦截器
http.interceptors.response.use(res => {
    return res
}, err => {
    // 监听 服务端报有错误就在页面弹出错误信息 
    if (err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })

        if (err.response.status === 401) {
            // 如果不满足以上的条件直接退回到登录页
            router.push('/login')
        }
    }

    return Promise.reject(err)
})




export default http