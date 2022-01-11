<template>
	<view>
		<!-- 选择收货地址 -->
		<view
			class="address-choose-box"
			v-if="JSON.stringify(address) === '{}'"
		>
			<button
				class="btnChooseAddress"
				size="mini"
				type="primary"
				@click="chooseAddress"
			>
				请选择收货地址+
			</button>
		</view>

		<!-- 收货信息 -->
		<view class="address-info-box" @click="chooseAddress" v-else>
			<view class="row1">
				<view class="row1-left">
					<view class="username">收货人: {{ address.userName }}</view>
				</view>
				<view class="row1-right">
					<view class="phone">电话: {{ address.telNumber }}</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址:</view>
				<view class="row2-right">{{ addstr }}</view>
			</view>
		</view>

		<!-- 底部边框线 -->
		<image src="/static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
	name: 'my-address',
	data() {
		return {
			// address: {}
		};
	},
	methods: {
		...mapMutations('m_user', ['updateAddress']),
		// 选择收货地址
		chooseAddress() {
			uni.chooseAddress({
				success: res => {
					this.updateAddress(res);
				}
			});
		}
	},
	computed: {
		...mapState('m_user', ['address']),
		...mapGetters('m_user', ['addstr'])
	}
};
</script>

<style lang="scss">
.address-choose-box {
	height: 90px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.address-info-box {
	font-size: 1em;
	height: 90px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 10rpx;
	.row1 {
		display: flex;
		justify-content: space-between;
		.row1-right {
			display: flex;
			justify-content: space-between;
		}
	}
	.row2 {
		display: flex;
		// justify-content: space-between;
		align-items: center;
		margin-top: 20rpx;
		.row2-left {
			white-space: nowrap;
			margin-right: 10rpx;
		}
	}
}
.address-border {
	display: block;
	width: 100%;
	height: 10rpx;
}
</style>
