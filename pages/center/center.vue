<template>
	<view class="content u-font-16">我的</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	onLoad() {
	console.log(this.$u.util.Logintoken())
	if (!this.$u.util.Logintoken())  return
	console.log('说明登录了')
	},

	methods: {}
};
</script>

<style lang="scss" scoped></style>
