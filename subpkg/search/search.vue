<template>
	<view>
		<view class="search-box">
			<uni-search-bar
				@input="input"
				:radius="100"
				cancelButton="none"
			></uni-search-bar>
		</view>
		<!-- 搜素建议列表 -->
		<uni-list v-if="searchResults.length !== 0">
			<uni-list-item
				:ellipsis="1"
				showArrow
				clickable
				@click="gotoDetail(item)"
				v-for="(item, index) in searchResults"
				:key="index"
				:title="item.goods_name"
			></uni-list-item>
		</uni-list>
		<!-- 搜索历史  -->
		<view class="history-box" v-else>
			<!-- 标题 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons @click="clean" type="trash" size="17"></uni-icons>
			</view>
			<!-- 列表 -->
			<view class="history-list">
				<uni-tag
					v-for="(item, index) in histories"
					:key="index"
					:text="item"
					@click="gotoGoodsList(item)"
				></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			timer: null,
			kw: '',
			// 搜索结果列表
			searchResults: [],
			// 搜索历史
			historyList: []
		};
	},
	onLoad() {
		this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
	},
	methods: {
		gotoGoodsList(kw){
			uni.navigateTo({
				url: '/subpkg/goods_list/goods_list?query='+kw
			});
		},
		clean(){
			this.historyList = []
			uni.setStorageSync('kw','[]')
		},
		gotoDetail(item) {
			uni.navigateTo({
				url:
					'/subpkg/goods_detail/goods_detail?goods_id=' +
					item.goods_id
			});
		},
		saveSearchHistory() {
			// this.historyList.push(this.kw)
			const set = new Set(this.historyList)
			set.delete(this.kw)
			set.add(this.kw)
			this.historyList = Array.from(set)
			// 搜索历史持久化储存
			uni.setStorageSync('kw',JSON.stringify(this.historyList))
		},
		input(e) {
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.kw = e;
				this.getSearchList();
			}, 500);
		},
		async getSearchList() {
			if (this.kw.length === 0) {
				this.searchResults = [];
				return;
			}

			const { data: res } = await uni.$http.get(
				'/api/public/v1/goods/qsearch',
				{ query: this.kw }
			);
			if (res.meta.status !== 200) return uni.$showMsg();
			this.searchResults = res.message;
			this.saveSearchHistory()
		}
	},
	computed: {
		histories() {
			return [...this.historyList].reverse()
		}
	},
};
</script>

<style lang="scss">
.search-box {
	z-index: 999;
	position: sticky;
	top: 0;
}
/deep/.uni-ellipsis-1 {
	font-size: 12px !important;
}
.history-box {
	padding: 0 20rpx;
	.history-title {
		display: flex;
		justify-content: space-between;
		height: 60rpx;
		align-items: center;
		font-size: 30rpx;
		border-bottom: 1px solid #efefef;
	}
	.history-list {
		display: flex;
		flex-wrap: wrap;
		.uni-tag {
			color: black;
			margin-top: 15rpx;
			margin-right: 15rpx;
			background-color: #f3f3f3;
		}
	}
}
</style>
