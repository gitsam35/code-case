import Vue from 'vue'
import App from './App'

// 引入vuex
import store from "@/store/store.js"

// 引入uView主JS库
import uView from "uview-ui";
Vue.use(uView);

// 挂载全局组件
import GoodItem from '@/components/good-item.vue'
Vue.component('good-item',GoodItem)
import NavCustoom from '@/components/nav-custom.vue'
Vue.component('nav-custom',NavCustoom)
import HomeTitle from '@/components/home-title.vue'
Vue.component('home-title',HomeTitle)
import Category from '@/components/nav-category.vue'
Vue.component('nav-category',Category)

// 挂载全局异步请求方法
import {$http,$get,$post} from 'utils/request.js'
Vue.prototype.$http = $http
Vue.prototype.$get = $get
Vue.prototype.$post = $post

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store // 注入状态机
})
app.$mount()
