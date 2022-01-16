<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<button type="primary" class="btn-login" @click="getuserInfo">
			一键登录
		</button>
		<view class="tips-text">登陆后尽享更多权益</view>
	</view>
</template>

<script>
import { mapMutations,mapState } from 'vuex';
export default {
	name: 'my-login',
	data() {
		return {};
	},
	computed: {
		...mapState('m_user',['redirectInfo'])
	},
	methods: {
		...mapMutations('m_user', ['updateUserInfo', 'updateToken','updateRedirectInfo']),
		// 用户授权,获取用户信息
		getuserInfo() {
			uni.getUserProfile({
				desc: '测试使用',
				provider: 'weixin',
				success: res => {
					// console.log(res);
					this.updateUserInfo(res.userInfo);
					if (res.errMsg === 'getUserProfile:ok') {
						this.getToken(res);
					}
				},
				fail(err) {
					return uni.$showMsg('您取消了授权!');
				}
			});
		},
		// 调用登录接口，换取永久的 token
		async getToken(info) {
			const [err, res] = await uni.login().catch(err => err);
			// console.log(err, res);
			// 判断是否 uni.login() 调用失败
			if (res.errMsg !== 'login:ok') return uni.$showMsg('登录失败！');
			const token =
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoienMiLCJ1c2VySWQiOiI5NTI3IiwiZXhwIjoxNjQyMzM0OTkyLjk2LCJpYXQiOjE2NDIyNDg1OTJ9.vb9xZLffHRAu9I9876E_YCBTM0tGFrtknYgjOQ_4Mqc';
			this.updateToken(token);
			this.navigateBack()
		},
		navigateBack(){
			if(this.redirectInfo && this.redirectInfo.openType === 'switchTab'){
				uni.switchTab({
					url:this.redirectInfo.from,
					complete: () => {
						this.updateRedirectInfo(null)
					}
				})
			}
		}
		// async getToken(info) {
		// 	const [err, res] = await uni.login().catch(err => err);
		// 	// console.log(err, res);
		// 	// 判断是否 uni.login() 调用失败
		// 	if(res.errMsg === 'login:ok'){
		// 		uni.$showMsg('登录成功！')
		// 	}
		// if(err || res.errMsg !== 'login:ok'){
		// 	return uni.$showMsg('登录失败！');
		// }

		// console.log(res,info);
		// // 准备参数对象
		// const query = {
		// 	code: res.code,
		// 	encryptedData: info.encryptedData,
		// 	iv: info.iv,
		// 	rawData: JSON.stringify(info.rawData),
		// 	signature: info.signature
		// };
		// console.log(query);
		// const {code,encryptedData,iv,rawData,signature} = query
		// // 换取 token
		// 方法1
		// uni.request({
		// 	url: '/api/public/v1/users/wxlogin',
		// 	method: 'POST',
		// 	data: {code,encryptedData,iv,rawData,signature},
		// 	success: res => {
		// 		console.log(res);
		// 	},
		// 	fail: (err) => {
		// 		console.log(err);
		// 	},
		// 	complete: () => {}
		// });
		// 方法2
		// const { data:loginResult } = await uni.$http.post(
		// 	'/api/public/v1/users/wxlogin',
		// 	query
		// );
		// console.log(loginResult);
		// if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
		// uni.$showMsg('登录成功')
		// }
	}
};
</script>

<style lang="scss">
.login-container {
	height: 750rpx;
	background-color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	overflow: hidden;
	&::after {
		content: '';
		display: block;
		width: 100%;
		height: 80rpx;
		background-color: #F5F5F5;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius: 100%;
		transform: translateY(50%);
	}
	.btn-login {
		width: 90%;
		border-radius: 200rpx;
		margin: 30rpx 0;
		background-color: #137afa;
	}
	.tips-text {
		font-size: 0.9em;
		color: gray;
	}
}
</style>
