<template>
	<view>
		<view class="goods-list">
			<view v-for="(goods, index) in goodsList" :key="index" @click="gotoDetail(goods)">
				<my-goods :goods="goods"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 请求参数对象
			queryObj: {
				query: '',
				cid: '',
				pagenum: 1,
				pagesize: 10
			},
			goodsList: [],
			total: 0,
			// 节流阀
			isLoading: false
		};
	},
	onLoad(options) {
		this.queryObj.query = options.query || '';
		this.queryObj.cid = options.cid || '';
		this.getGoodsList();
	},
	methods: {
		// 获取商品列表数据
		async getGoodsList(cb) {
			// 打开节流阀
			this.isLoading = true
			const { data: res } = await uni.$http.get(
				'/api/public/v1/goods/search',
				this.queryObj
			);
			// 关闭节流阀
			this.isLoading = false
			cb && cb()
			if (res.meta.status !== 200) return uni.$showMsg('数据加载失败,请稍后重试!');
			this.goodsList = [...this.goodsList,...res.message.goods]
			this.total = res.message.total;
		},
		gotoDetail(goods){
			uni.navigateTo({
				url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		}
	},
	onReachBottom() {
		if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.showToast({
			title:"加载完毕！"
		})
		if(this.isLoading) return
		// 让页码自增
		this.queryObj.pagenum+=1
		this.getGoodsList()
	},
	onPullDownRefresh() {
		// 重置关键数据
		this.queryObj.pagenum = 1
		this.total = 0
		this.isLoading = false
		this.goodsList = []
		// 重新发起数据请求
		this.getGoodsList(()=>{uni.stopPullDownRefresh()})
	}
};
</script>

<style lang="scss">

</style>
