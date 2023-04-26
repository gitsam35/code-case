<template>
	<view>
		<view class="cont">
		</view>
		<view class="nav margin-lr bg-fff">
			<view class="text-center" >
				<image @click="handleUser" class="nav-img" src="../../static/img/dangao.png" mode=""></image>
			</view>
			<view class="h3 fs28 text-center">
				{{username}}
			</view>
			<view class="text-center" @click="handleUser">
			<text class="iconfont icon-qiehuan padding-sm"></text>
			<view class="">
				切换账号
			</view>
			</view>
			<view class="flex flex-wrap margin-sm">
				<view  v-for="(item,index) in gridArr" :key="item.index">
					<view @click="gridOpen(item)"
						class="grid flex flex-direction align-center padding ">
						<text :class="['iconfont color-yel',item.icon]"></text>
						{{item.name}}
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
		import  '@/static/css/iconfont.css';
	export default {
		data() {
			return {
				gridArr: [{
						id:0,
						icon: 'icon-baogao',
						path:'/pages/',
						name: '我的订单'
					},
					{
						id:1,
						icon: 'icon-gouwu',
						path:'/pages/',
						name: '待付款'
					},
					{
						id:2,
						icon: 'icon-daishouhuo',
						path:'/pages/',
						name: '待收货'

					},
					{
						id:3,
						icon: 'icon-guanyuwomen',
						path:'/pages/about/about',
						name: '关于我们'
					},
					{
						id:4,
						icon: 'icon-jifen',
						path:'/pages/',
						name: '积分'
					},
					{
						id:5,
						icon: 'icon-dingwei',
						path:'/pagesA/address/address-detail',
						name: '地址修改'
					},
					{
						id:6,
						icon: 'icon-youhuiquan',
						path:'/pages/',
						name: '优惠券'
					},
					{
						id:7,
						icon: 'icon-hongbao',
						path:'/pages/',
						name: '红包'
					}
				]
			}
		},
		computed: {
			username() {
				let {
					userInfo
				} = this.$store.state.user
				let name = userInfo ? userInfo.username : '尚未登录'
				return name
			}
		},
		onShow() {
		},
		methods: {
			handleUser() {
				uni.navigateTo({
					url: '/pagesA/user/login'
				})
			},
			gridOpen(i){
				uni.navigateTo({
					url:i.path
				})
			}
		}
	}
</script>

<style lang="scss">
	.cont {
		// background-color: #f8f8f8;
		height: 600upx;
		background: linear-gradient(to right, red , yellow);

	}

	.nav {
		margin-top: -220upx;

		.nav-img {
			width: 160upx;
			height: 160upx;
			border: #ffff00 solid;
			border-radius: 50%;
			margin-top: -80upx;
			background: #f8f8f8;
		}
	}
	.grid{
		height: 200upx;
		width: 160upx;
		}
	.grid .iconfont {
		font-size: 60upx;
		// color: #ffe32a;
	}
	

</style>
