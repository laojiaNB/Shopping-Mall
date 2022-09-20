<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录图书商城</view>
			<input class="u-border-bottom" type="name" v-model="name" placeholder="昵称" />
			<input class="u-border-bottom" type="email" v-model="email" placeholder="请输入邮箱" />
			<input class="u-border-bottom" type="password" v-model="password" placeholder="密码" />
			<input class="u-border-bottom" type="password_confirmation" v-model="password_confirmation" placeholder="确认密码" />
			<button @click="submit" :style="[inputStyle]" class="getCaptcha">注册</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			name: '小贾',
			email: 'test@xjia.com',
			password: '123456',
			password_confirmation: '123456'
		};
	},
	computed: {
		inputStyle() {
			let style = {};
			if (this.$u.test.email(this.email) && this.password && this.name && this.password_confirmation) {
				//框架自带的验证
				style.color = '#fff';
				style.backgroundColor = this.$u.color['warning'];
			}
			return style;
		}
	},
	methods: {
		async submit() {
			let info = { email: this.email, password: this.password, password_confirmation: this.password_confirmation, name: this.name };

			if (this.password_confirmation===this.password) {
				console.log('等于')
				let res = await this.$u.api.getRegister(info);
				 this.$u.route({url:'pages/auth/login',type:'redirectTo'});
			}
			return;
		}
	},
	onLoad() {}
};
</script>

<style lang="scss" scoped>
.u-border-bottom {
	margin-bottom: 30rpx !important;
}
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.getCaptcha {
			background-color: rgb(253, 243, 208);
			color: $u-tips-color;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;

			&::after {
				border: none;
			}
		}
		.alternative {
			color: $u-tips-color;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
	.buttom {
		.loginType {
			display: flex;
			padding: 350rpx 150rpx 150rpx 150rpx;
			justify-content: space-between;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: $u-content-color;
				font-size: 28rpx;
			}
		}

		.hint {
			padding: 20rpx 40rpx;
			font-size: 20rpx;
			color: $u-tips-color;

			.link {
				color: $u-type-warning;
			}
		}
	}
}
</style>
