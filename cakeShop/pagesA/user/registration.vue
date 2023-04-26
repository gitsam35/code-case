<template>
	<view class="content">
		<view class="logo"><image src="../../static/img/dangao.png" mode=""></image></view>
		<view class="uni-form-item uni-column">
			<input v-model="info.username" type="tel" class="uni-input" name="" placeholder="请输入手机号或用户名" />
		</view>
		<view class="uni-form-item uni-column">
			<input v-model="info.password" type="password" class="uni-input" name="" placeholder="请输入密码" />
		</view>
		<button type="primary" @click="handleReg">注册</button>
		<view class="links">已有账号？<view class="link-highlight" @tap="gotoLogin">点此登陆</view></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				captchaImg: '',
				seconds: 10,
				codeBtn: {
					text: '获取验证码',
					waitingCode: false,
					count: this.seconds
				},
				info:{
					username:'',
					password:''
				}
			}
		},
		onLoad() {

		},
		methods: {
			handleReg(){
				this.$post('/1.1/users',this.info).then(res=>{
				let {objectId,code} = res
				let title = code === 202 ? '账号已经注册' : '注册成功'
				uni.showToast({
					title,
					icon:'none'
				})
				})
			},
			gotoLogin: function () {
				uni.navigateTo({
					url: 'login'
				})
			}
		},
		computed: {
			disableCodeBtn: function (){
				return this.codeBtn.waitingCode || this.captchaImg.length < 4;
			} 
		}
	}
</script>

<style lang="scss" scoped>
		page{
			background-color: #fbfbfb;
		}
	$color-primary: #007aff;
	.content{
		padding: 60upx 100upx 100upx;
	}
	.logo{
	    text-align: center;
		image{
		    height: 200upx;
		    width: 200upx;
		    margin: 0 0 40upx;
		}
	}
	.uni-form-item{
		margin-bottom: 40upx;
		padding: 0;
		border-bottom: 1px solid #e3e3e3;
		.uni-input{
			font-size: 30upx;
			padding: 7px 0;
			height: 60upx;
		}
	}
	.column-with-btn{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		button{
			font-size: 24upx;
			margin: 0;
			width: 180upx;
			text-align: center;
			&:after{
				border: none
			}
			&.active{
				background-color: $color-primary;
				color: $uni-text-color-inverse;
			}
		}
	}
	.img-captcha{
		width: 150upx;
		height: 60upx;
	}
	button[type="primary"]{
		background-color: $color-primary;
		border-radius: 0;
		font-size: 34upx;
		margin-top: 60upx;
	}
	.links{
		text-align: center;
		margin-top: 40upx;
		font-size: 26upx;
		color: #999;
		view{
			display: inline-block;
			vertical-align: top;
			margin: 0 10upx;
		}
		.link-highlight{
			color: $color-primary
		}
	}
</style>
