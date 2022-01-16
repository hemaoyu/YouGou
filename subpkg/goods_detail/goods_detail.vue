<template>
	<view v-if="goods_info.goods_name" class="goods_detail_container">
		<!-- 轮播图 -->
		<swiper
			indicator-dots
			autoplay
			circular
			:interval="3000"
			:duration="1000"
		>
			<swiper-item v-for="(item, index) in goods_info.pics" :key="index">
				<image :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price">￥{{ goods_info.goods_price }}</view>
			<!-- 商品信息主题 -->
			<view class="goods-info-body">
				<view class="goods-name">{{ goods_info.goods_name }}</view>
				<view class="favi">
						<uni-icons
							type="star"
							size="18"
							color="gray"
						></uni-icons>
						<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="fy">快递：免运费</view>
		</view>
		<!-- 图文详情 -->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		<!-- 底部商品导航 -->
		<view class="goods_nav">
			<uni-goods-nav
				:fill="true"
				:options="options"
				:buttonGroup="buttonGroup"
				@click="onClick"
				@buttonClick="buttonClick"
			/>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
	computed: {
		...mapState('m_cart', []),
		...mapGetters('m_cart', ['total']),
		goods(){
			return {
					goods_id: this.goods_info.goods_id, // 商品的Id
					goods_name: this.goods_info.goods_name, // 商品的名称
					goods_price: this.goods_info.goods_price, // 商品的价格
					goods_count: 1, // 商品的数量
					goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
					goods_state: true // 商品的勾选状态
				};
		}
	},
	watch: {
		// total(newVal) {
		// 	const findResult = this.options.find((x) => x.text === '购物车')
		// 	if(findResult){
		// 		findResult.info = newVal
		// 	}
		// }
		total: {
			handler(newVal) {
				const findResult = this.options.find(x => x.text === '购物车');
				if (findResult) {
					findResult.info = newVal;
				}
			},
			immediate: true
		}
	},
	data() {
		return {
			goods_info: {},
			options: [
				{
					icon: 'shop',
					text: '店铺'
				},
				{
					icon: 'cart',
					text: '购物车',
					info: 0
				}
			],
			buttonGroup: [
				{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}
			],
		};
	},
	onLoad(options) {
		const goods_id = options.goods_id;
		this.getGoodsDetail(goods_id);
		this.collect = this.collectStatus
	},
	methods: {
		buttonClick(e) {
			if (e.content.text === '加入购物车') {
				// 组织商品信息对象
				// const goods = {
				// 	goods_id: this.goods_info.goods_id, // 商品的Id
				// 	goods_name: this.goods_info.goods_name, // 商品的名称
				// 	goods_price: this.goods_info.goods_price, // 商品的价格
				// 	goods_count: 1, // 商品的数量
				// 	goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
				// 	goods_state: true // 商品的勾选状态
				// };

				// 调用addToCart
				this.addToCart(this.goods);
			}
		},
		...mapMutations('m_cart', ['addToCart']),
		async getGoodsDetail(goods_id) {
			const { data: res } = await uni.$http.get(
				'/api/public/v1/goods/detail',
				{ goods_id }
			);
			if (res.meta.status !== 200) return uni.$showMsg();
			// 通过正则修改返回数据的代码,改掉webp格式为jpg图片，做iOS兼容
			res.message.goods_introduce = res.message.goods_introduce
				.replace(/<img/g, '<img style="display:block;"')
				.replace(/webp/g, 'jpg');
			this.goods_info = res.message;
			// <img style=\"display:block;\" data-src=\"//image.suning.cn/uimg/sop/commodity/966602987133443585157120_x.jpg?from=mobile&amp;format=80q.webp\" alt=\"\" src=\"//image.suning.cn/uimg/sop/commodity/966602987133443585157120_x.jpg?from=mobile&format=80q.webp\" width=\"100%\" height=\"auto\">
		},
		preview(index) {
			uni.previewImage({
				//图片索引
				current: index,
				//图片地址
				urls: this.goods_info.pics.map(x => x.pics_big)
			});
		},
		onClick(e) {
			if (e.content.text === '购物车') {
				uni.switchTab({
					url: '/pages/cart/cart'
				});
			}
		}
	}
};
</script>

<style lang="scss">
swiper {
	height: 750rpx;
	image {
		width: 100%;
		height: 100%;
	}
}
.goods-info-box {
	padding: 10px;
	padding-right: 0;
	.price {
		color: #c00000;
		font-size: 18px;
		margin: 10px 0;
	}
	.goods-info-body {
		display: flex;
		justify-content: space-between;
		.goods-name {
			font-size: 13px;
			margin-right: 10px;
		}
		.favi {
			width: 120px;
			font-size: 12px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-left: 1px solie #efefef;
			color: gray;
		}
	}
	.fy {
		font-size: 12px;
		color: gray;
		margin: 10px 0;
	}
}
.goods_nav {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}
.goods_detail_container {
	padding-bottom: 50px;
}
</style>
