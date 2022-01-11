<template>
	<view class="my-settle-container">
		<!-- 全选 -->
		<label class="137AFA" @click="changeAllState">
			<radio color="#137AFA" :checked="isFullCheck" />
			<text>全选</text>
		</label>
		<!-- 总计 -->
		<view class="amount-box">
			总计:
			<text class="amount">￥{{checkGoodsAmount}}</text>
		</view>
		<!-- 按钮 -->
		<view class="bnt-settle">立即购买({{checkedCount}})</view>
	</view>
</template>

<script>
import { mapGetters,mapMutations } from 'vuex';
export default {
	name: 'my-settle',
	data() {
		return {};
	},
	methods: {
		...mapMutations('m_cart',['updateAllGoodsState']),
		changeAllState(){
			this.updateAllGoodsState(!this.isFullCheck)
		}
	},
	computed: {
		...mapGetters('m_cart', ['checkedCount','total','checkGoodsAmount']),
		isFullCheck(){
			return this.total === this.checkedCount
		}
	}
};
</script>

<style lang="scss">
.my-settle-container {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100rpx;
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 0.9em;
	padding-left: 10rpx;
	.radio {
		display: flex;
		align-items: center;
	}
	.amount-box {
		.amount {
			color: #c00000;
			font-weight: bold;
		}
	}
	.bnt-settle {
		background-color: #137afa;
		height: 100rpx;
		color: white;
		line-height: 100rpx;
		padding: 0 20rpx;
		min-width: 200rpx;
		text-align: center;
	}
}
</style>
