import Vue from 'vue'
import App from './App.vue'
// 导入 element组件
import './plugins/element.js'

import router from './router'
// 导入全局样式表
import './assets/css/global.css'

// 注册导出xls组件
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)

Vue.config.productionTip = false

// 导入 http
import http from './http'
Vue.prototype.$http = http

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')