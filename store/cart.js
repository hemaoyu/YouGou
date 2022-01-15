export default {
	namespaced: true,

	state: () => ({
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),

	mutations: {
		addToCart(state, goods) {
			const findResult = state.cart.find(x => x.goods_id == goods.goods_id)

			if (!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count += 1
			}
			uni.showToast({
				title:"加入成功!"
			})

			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 更新购物车中勾选状态
		updateGoodsState(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if (findResult) {
				findResult.goods_state = goods.goods_state
				this.commit('m_cart/saveToStorage')
			}
		},
		// 更新商品的数量
		updateGoodsCount(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if (findResult) {
				findResult.goods_count = goods.goods_count
				this.commit('m_cart/saveToStorage')
			}
		},
		// 根据id删除商品信息
		removeGoodsById(state, goods_id) {
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			this.commit('m_cart/saveToStorage')
		},
		// 更新购物车中商品的勾选状态
		updateAllGoodsState(state, newState) {
			state.cart.forEach(x => x.goods_state = newState)
			this.commit('m_cart/saveToStorage')
		}
	},

	getters: {
		// 购物车中所有商品总数量
		total(state) {
			// let c = 0
			// state.cart.forEach(goods => c += goods.goods_count)
			// return c
			return state.cart.reduce((total, item) => total += item.goods_count, 0)
		},
		// 已勾选商品数量
		checkedCount(state) {
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		// 已勾选商品总价
		checkGoodsAmount(state) {
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count * item.goods_price,
				0).toFixed(2)
		}
	}
}
