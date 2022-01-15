// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from 'store/store.js'
// 导入网络请求的包
import { $http } from '@escook/request-miniprogram'

uni.$http = $http
// 请求根路径
// #ifdef H5
$http.baseUrl = '/uinav'
// #endif
// #ifndef H5
$http.baseUrl = 'https://www.uinav.com'
// #endif

// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
	// 请求拦截器
	uni.showLoading({
		title: '数据加载中...'
	});
	// 判断当前请求是否是有token权限限制的接口,判断请求地址是否有'/my'的字段,如果包含了/my,indexOf返回-1
	if(options.url.indexOf('/my/') !== -1){
		// 请求头添加token字段
		options.header = {
			Authorization: store.state.m_user.token
		}
	}
	// console.log(store.state.m_user.token);
}

// 请求完成之后做一些事情
$http.afterRequest = function() {
	// 相应拦截器
	uni.hideLoading()
}

// 封装弹框的方法
uni.$showMsg = function(title = '数据请求失败!', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
