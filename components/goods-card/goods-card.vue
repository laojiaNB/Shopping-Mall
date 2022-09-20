<template>
	<view>
		<navigator class="good-item">
			<u-image class="u-skeleton-fillet" width="100%" height="300rpx" :src="item.cover_url"></u-image>
			<view class="title u-line-1 u-skeleton-circle">{{ item.title }}</view>
			<view class="u-flex u-row-between ">
				<view class="price u-skeleton-circle">价格:{{ item.price }}</view>
				<view class="sales u-skeleton-circle">销量:{{ item.sales }}</view>
			</view>
		</navigator>
	</view>
</template>

<script>
export default {
	name: 'goods-card',
	props: {
		item: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="scss">
.good-item {
	padding: 40rpx;
	// box-sizing: ;
	box-shadow: 0 12rpx 20rpx 0 rgba(0, 0, 0, 0.1);
	.title {
		margin: 20rpx 0rpx;
		font-weight: bold;
		font-size: 32rpx;
	}
	.price {
		color: red;
		width: 40%;
	}
	.sales {
		color: #888;
		width: 40%;
	}
}
</style>
