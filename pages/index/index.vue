<template>
	<view>
		<view class="wrap"><u-swiper :list="slides" name="img_url" height="320" mode="rect" autoplay></u-swiper></view>
		<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<u-row gutter="16" class="u-skeleton">
			<u-col span="6" v-for="item in goods.length !== 0 ? goods : [{}, {}, {}, {}]">
				<!-- 声明书导航 -->
				<goods-card :item="item"></goods-card>
			</u-col>
		</u-row>
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello',
			loading: true,
			list: [
				{
					name: '所有'
				},
				{
					name: '热销'
				},
				{
					name: '推荐'
				},
				{
					name: '最新'
				}
			],
			current: 0,
			src: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
			slides: [], //轮播图数据
			links: [], //友情链接数据
			goods: [], //推荐商品数据
			categories: [], //分页
			page: 2 // 页数
		};
	},
	methods: {
		change(index) {
			// 切换
			console.log(index);
			this.current = index;
			this.goods = []; // 重置  商品数据
			this.page = 1; // 恢复到 第一页
			this.getList();
		},
		async getList() {
			this.loading = true;
			let params = {
				page: this.page
			};
			// 不同类型 添加参数不同
			if (this.current == 0) {
				console.log('默认数据');
			} else if (this.current == 1) {
				params.sales = 1;
			} else if (this.current == 2) {
				params.recommend = 1;
			} else if (this.current == 3) {
				params.new = 1;
			}
			// 这里传入 选项的参数
			let res = await this.$u.api.getindex(params);
			this.loading = false;
			console.log(res);
			this.slides = res.slides;
			this.links = res.links;
			this.goods = [...this.goods.concat(res.goods.data)];
			// 合并 拿到最新的
		}
	},
	onLoad() {
		this.getList();
		this.$u.util.Logintoken(); // 用户拦截
		console.log(123);
		let pages = getCurrentPages(); //所有页面
		let page = pages[pages.length - 1]; //拿到 来源页 （当前页）
	},
	async onReachBottom() {
		// 触底事件  改变分页参数
		this.page++;
		this.getList();
	}
};
</script>

<style lang="scss" scoped></style>
