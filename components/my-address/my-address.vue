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
		async chooseAddress() {
			  const [err, succ] = await uni.chooseAddress().catch(err => err)
			  if (succ && succ.errMsg === 'chooseAddress:ok') {
			    // 更新 vuex 中的收货地址
			    this.updateAddress(succ)
			  }
			
			  // 用户没有授权
			  if (err && err.errMsg === 'chooseAddress:fail auth deny') {
			    this.reAuth() 
			  }
		},
		// 调用此方法，重新发起收货地址的授权
		async reAuth() {
		  // 提示用户对地址进行授权
		  const [err2, confirmResult] = await uni.showModal({
		    content: '检测到您没打开地址权限，是否去设置打开？',
		    confirmText: "确认",
		    cancelText: "取消",
		  })
		  // 如果弹框异常，则直接退出
		  if (err2) return
		  if (confirmResult.cancel) return uni.$showMsg('您取消了地址授权！')
		  if (confirmResult.confirm) return uni.openSetting({
		    success: (settingResult) => {
		      if (settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
		      if (!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权！')
		    }
		  })
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
