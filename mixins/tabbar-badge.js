import {
	mapGetters
} from 'vuex';
export default {
	computed: {
		...mapGetters('m_cart', ['total'])
	},
	watch: {
		total() {
			this.setBadge();
		}
	},
	onShow() {
		this.setBadge();
	},
	methods: {
		setBadge() {
			uni.setTabBarBadge({
				index: 2, //购物车的下标索引
				text: this.total + ''
			});
		}
	}
}
