<template>
	<view class="my-userinfo-container">
		<view class="top-box">
			<image :src="userinfo.avatarUrl" class="avatar"></image>
			<view class="nickname">{{ userinfo.nickName }}</view>
		</view>

		<!-- 面板区 -->
		<view class="panel-list">
			<!-- 第一个 -->
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>14</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>18</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>84</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			<!-- 第二个 -->
			<view class="panel">
				<view class="panel-title">我的订单</view>
				<view class="panel-body">
					<view class="panel-item">
						<image
							src="/static/my-icons/icon1.png"
							class="icon"
						></image>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<image
							src="/static/my-icons/icon2.png"
							class="icon"
						></image>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<image
							src="/static/my-icons/icon3.png"
							class="icon"
						></image>
						<text>退款/退货</text>
					</view>
					<view class="panel-item">
						<image
							src="/static/my-icons/icon4.png"
							class="icon"
						></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<!-- 第三个 -->
			<view class="panel">
				<view class="panel-list-item" @click="chooseAddress">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					<button open-type="contact" :plain='true' size="mini" style="border: 0; background-color: #fff;font-size: 15px;font-weight: 500 !important;margin: 0;padding: 0;">联系客服</button>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	computed: {
		...mapState('m_user', ['userinfo'])
	},
	name: 'my-userinfo',
	data() {
		return {};
	},
	methods: {
		...mapMutations('m_user', [
			'updateAddress',
			'updateUserInfo',
			'updateToken'
		]),
		...mapMutations('m_user', ['updateAddress']),
		async chooseAddress() {
			// 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
			  //    返回值是一个数组：第1项为错误对象；第2项为成功之后的收货地址对象
			  const [err, succ] = await uni.chooseAddress().catch(err => err)
			
			  // 2. 用户成功的选择了收货地址
			  if (succ && succ.errMsg === 'chooseAddress:ok') {
			    // 更新 vuex 中的收货地址
			    this.updateAddress(succ)
			  }
			
			  // 3. 用户没有授权
			  if (err && err.errMsg === 'chooseAddress:fail auth deny') {
			    this.reAuth() // 调用 this.reAuth() 方法，向用户重新发起授权申请
			  }
		},
		logout() {
			uni.showModal({
				title: '提示',
				content: '是否退出登录?',
				success:res=> {
					if (res.confirm) {
						console.log('用户点击确定');
						this.updateAddress({});
						this.updateUserInfo({});
						this.updateToken('');
						console.log(111);
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.my-userinfo-container {
	height: 100%;
	background-color: #f4f4f4;
	.top-box {
		height: 400rpx;
		background-color: #137afa;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.avatar {
			width: 180rpx;
			height: 180rpx;
			border-radius: 90rpx;
			border: 2px solid #fff;
			box-shadow: 0 2rpx 10rpx gray;
		}
		.nickname {
			font-size: 16px;
			color: #fff;
			font-weight: bold;
			margin-top: 20rpx;
		}
	}
}
.panel-list {
	padding: 0 20rpx;
	position: relative;
	top: -20rpx;
	.panel {
		background-color: white;
		border-radius: 6rpx;
		margin-bottom: 16rpx;
		.panel-title {
			line-height: 90rpx;
			padding-left: 20rpx;
			font-size: 15px;
			border-bottom: 1px solid #f4f4f4;
		}
		.panel-body {
			display: flex;
			justify-content: space-around;
			.panel-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				padding: 20rpx 0;
				font-size: 13px;

				.icon {
					width: 70rpx;
					height: 70rpx;
				}
			}
		}
	}
}
.panel-list-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 15px;
	padding: 0 20rpx;
	line-height: 90rpx;
}
</style>
