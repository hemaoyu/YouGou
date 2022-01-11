<template>
	<view class="cart-container" v-if="cart.length!==0">
		<!-- 收货地址 -->
		<my-address></my-address>
		<!-- 商品列表标题 -->
		<view class="cart-titlt">
			<!-- 左侧图 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 右侧文 -->
			<text class="cart-titlt-text">购物车</text>
		</view>
		<!-- 循环渲染购物车列表 -->
		<uni-swipe-action>
			<block v-for="(goods, index) in cart" :key="index">
				<uni-swipe-action-item :right-options="options" @click="swipeItemHandler(goods)">
					<my-goods
						:goods="goods"
						:show-radio="true"
						:show-num="true"
						@radio-change="radioChangeHandler"
						@num-change="numberChangeHandler"
					></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		
		<!-- 使用结算组件 -->
		<my-settle></my-settle>
	</view>
	
	<!-- 空白购物车展示 -->
	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-img"></image>
		<text class="tip-text">空空如也~</text>
	</view>
</template>

<script>
import badgeMix from '../../mixins/tabbar-badge.js';
import { mapState, mapMutations } from 'vuex';

export default {
	mixins: [badgeMix],
	computed: {
		...mapState('m_cart', ['cart'])
	},
	data() {
		return {
			options:[{
				text:'删除',
				style:{
					backgroundColor:'#137AFA'
				}
			}]
		};
	},
	methods: {
		...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount','removeGoodsById']),
		radioChangeHandler(e) {
			// console.log(e);
			this.updateGoodsState(e);
		},
		numberChangeHandler(e) {
			// console.log(e);
			this.updateGoodsCount(e);
		},
		swipeItemHandler(goods){
			// console.log(goods);
			this.removeGoodsById(goods.goods_id)
		}
	}
};
</script>

<style lang="scss">
	.cart-container{
		padding-bottom: 100rpx;
	}
.cart-titlt {
	height: 40px;
	display: flex;
	align-items: center;
	padding-left: 5px;
	border-bottom: 1px solid #efefef;
	.cart-titlt-text {
		font-size: 14px;
		margin-left: 10px;
	}
}
.empty-cart{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 400rpx;
	.empty-img{
		width: 180rpx;
		height: 180rpx;
	}
	.tip-text{
		font-size: 0.9em;
		color: gray;
		margin-top: 30rpx;
	}
}
</style>
