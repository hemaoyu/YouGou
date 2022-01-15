<template>
	<view  v-if="goods">
		<view class="goods-item">
			<!-- 左侧 -->
			<view class="goods-item-left">
				<radio
					:checked="goods.goods_state"
					color="#137AFA"
					v-if="showRadio"
					@click="radioClickHandler"
				></radio>
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
						¥{{ goods.goods_price | tofixed }}
					</view>
					<uni-number-box
						:min="1"
						:value="goods.goods_count"
						v-if="showNum"
						@change="numChangeHandler"
					></uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		goods: {
			type: Object,
			default: {}
		},
		showRadio: {
			type: Boolean,
			default: false
		},
		showNum: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			// 默认图片
			defaultPic:
				'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
		};
	},
	methods: {
		// 这是radio组建的点击事件
		radioClickHandler() {
			this.$emit('radio-change', {
				goods_id: this.goods.goods_id,
				goods_state: !this.goods.goods_state
			});
		},
		// 监听到numbox数量发生变化的函数
		numChangeHandler(val) {
			// console.log(val);
			this.$emit('num-change', {
				goods_id: this.goods.goods_id,
				goods_count: +val
			});
		}
	},
	filters: {
		tofixed(num) {
			return Number(num).toFixed(2);
		}
	}
};
</script>

<style lang="scss">
.goods-item {
	width: 750rpx;
	box-sizing: border-box;
	display: flex;
	padding: 20rpx 10rpx;
	border-bottom: 1px solid #f0f0f0;
	.goods-item-left {
		margin-right: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.goods-pic {
			width: 200rpx;
			height: 200rpx;
			display: block;
		}
	}
	.goods-item-right {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		.goods-name {
			font-size: 0.8em;
		}
		.goods-info-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.goods-price {
				color: #f00;
				font-size: 1em;
			}
		}
	}
}
</style>
