<template>
	<view>
		<view class="goods-item">
			<!-- 左侧 -->
			<view class="goods-item-left">
				<image
					:src="goods.goods_small_logo || defaultPic"
					class="goods-pic"
				></image>
			</view>
			<!-- 右侧 -->
			<view class="goods-item-right">
				<view class="goods-name">{{ goods.goods_name }}</view>
				<view class="goods-info-box">
					<view class="goods-price">
						¥{{ goods.goods_price |tofixed }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			goods:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				// 默认图片
				defaultPic:
					'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.goods-item{
		display: flex;
		padding: 20rpx 10rpx;
		border-bottom: 1px solid #f0f0f0;
		.goods-item-left{
			margin-right: 10rpx;
			.goods-pic{
				width: 200rpx;
				height: 200rpx;
				display: block;
			}
		}
		.goods-item-right{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.goods-name{
				font-size: 0.8em;
			}
			.goods-info-box{
				.goods-price{
					color: #F00;
					font-size: 1em;
				}
			}
		}
	}
</style>
