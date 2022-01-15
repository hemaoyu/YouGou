export default {
	namespaced: true,

	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: uni.getStorageSync('token') || '',
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		// 登录后的重定向
		redirectInfo:null
	}),

	mutations: {
		// 存储用户地址
		updateAddress(state, address) {
			state.address = address
			this.commit('m_user/saveAddressToStorage')
		},
		// 持久化存储address
		saveAddressToStorage(state) {
			uni.setStorageSync('address', JSON.stringify(state.address))
		},
		// 存储用户信息
		updateUserInfo(state,userinfo){
			state.userinfo = userinfo
			this.commit('m_user/saveUserInfoToStorage')
		},
		// 持久化存储userinfo
		saveUserInfoToStorage(state) {
			uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		},
		// 存储token
		updateToken(state,token){
			state.token = token
			this.commit('m_user/saveTokenToStorage')
		},
		// 持久化存储token
		saveTokenToStorage(state) {
			uni.setStorageSync('token', state.token)
		},
		updateRedirectInfo(stete,info){
			stete.redirectInfo = info
			console.log(stete.redirectInfo);
		}
	},

	getters: {
		// 收货地址
		addstr(state) {
			if (!state.address.provinceName) return '';
			return (
				state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
			);
		}
	}
}
