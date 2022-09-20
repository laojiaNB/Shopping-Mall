<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录图书商城</view>
			<input class="u-border-bottom" type="email" v-model="email" placeholder="请输入邮箱" />
			<input class="u-border-bottom" type="password" v-model="password" placeholder="密码" />
			<button @click="submit" :style="[inputStyle]" class="getCaptcha">登录</button>
			<view class="alternative">
				<view class="password">找回密码</view>
				<view class="issue" @click="registerFn">注册</view>
			</view>
		</view>
		<view class="buttom">
			<view class="hint">
				登录代表同意
				<text class="link">美团点评用户协议、隐私政策，</text>
				并授权使用您的美团点评账号信息（如昵称、头像、收获地址）以便您统一管理
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			email: 'test@a.com',
			password: '123123'
		};
	},
	computed: {
		inputStyle() {
			let style = {};
			if (this.$u.test.email(this.email) && this.password) {
				//框架自带的验证
				style.color = '#fff';
				style.backgroundColor = this.$u.color['warning'];
			}
			return style;
		}
	},
	methods: {
		async submit() {
			let info = { email: this.email, password: this.password };
			if (this.$u.test.email(this.email) || this.password) {
				let res = await this.$u.api.getLogin(info);
				this.$u.vuex('vuex_token', res.access_token); // 缓存 token

				setTimeout(() => {
					// 登录之后 跳转到 来源页  或者 首页
					const pageUrl = uni.getStorageSync('pageUrl') || 'pages/index/index';
					this.$u.route({
						url: pageUrl,
						type: 'reLaunch'
					});
				}, 1000);

				this.$u.api.getuser().then(res => this.$u.vuex('vuex_user', res)); //用户名
			}
			return;
		},
		registerFn() {
			console.log(1)
		 // this.$u.route('pages/auth/register');
		 this.$u.route({url:'pages/auth/register',type:'redirectTo'});
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
