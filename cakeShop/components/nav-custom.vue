<template>
	<view>
		<view class="cont">
			<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-locationfill text-gray"></text> 南宁
			</view>
			<view class="text-bold">
				甜心蛋糕
			</view>
			<view class="action">
				<text @click="searchOpen()">
					<text class="cuIcon-search text-grey"></text>
				</text>
				<u-line direction="col" length="15" color="#aaaaaa" margin="20upx"></u-line>
				<text @click="openAbout()" class="cuIcon-sort text-grey"></text>
			</view>
		</view>
		</view>
		
		
		
		<view class="">
			<!-- 搜索框 -->
				<u-popup  :show="show" @close="close" mode="bottom" :round="50" closeOnClickOverlay safeAreaInsetBottom>
					<view class="text-center padding bg-fff">
						<view class="">
							<u-input placeholder="请输商品入关键字" border="surround" v-model="value"></u-input>
						</view>
						<view class="keyword">
							<text>商品关键字：慕斯、巧克力、奶油、等等...</text>
						</view>
						<button @click ="handleSearch" class="bg-ffe">搜索</button>
					</view>
				</u-popup>
				
				<!-- 其他信息 -->
				<u-popup  :show="showAbout" @close="closeAbout" mode="bottom" :round="50" closeOnClickOverlay safeAreaInsetBottom>
				<!-- <view class=""> -->
						
					
				<view v-for="(item,i) in aboutArr" :key="item.id" class="about">
					<text @click="getAbout(item)">
						<text :class="['iconfont',item.icon]"></text>
						<text class="padding">{{item.title}}</text>
					</text>
				</view>
				<!-- </view> -->
				</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		name: "nav-custom",
		data() {
			return {
				show: false,
				showAbout: false,
				value: '',
				aboutArr: [{
						id:'1',
						path: '/pages/',
						icon: 'icon-dangao',
						title: '最新活动'
					},
					{
						id:'2',
						path: '/pages/',
						icon: 'icon-my',
						title: '个人中心'
					},
					{
						id:'3',
						path: '/pagesA/about/about',
						icon: 'icon-about',
						title: '关于我们'
					},
					{
						id:'4',
						path: '/pages/',
						icon: 'icon-ditu',
						title: '配送距离'
					},
				]
			};
		},
		methods: {
			handleSearch() {
				this.$get(`/1.1/classes/goods?where={"fname":"${this.value}"}`).then(res => {
					if (res.results.length) {
						this.$store.commit('goods/changeGoodsList', res.results)
						uni.showToast({
						    title: '搜索成功',
						    icon: 'success',
						    //显示持续时间为 1.5秒
						    duration: 1500
						})
					} else {
						uni.showToast({
						    title: '无当前商品',
						    //显示持续时间为 1.5秒
						    duration: 1500
						})
					}

					this.show = false
				})

			},

			searchOpen() {
				let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
				let curRoute = routes[routes.length - 1].route // 获取当前页面路由，也就是最后一个打开的页面路由
				if (curRoute == 'pages/cake/cake') {
					this.show = !this.show
				}


				uni.switchTab({
					url: '/pages/cake/cake'
				});
			},
			openAbout() {
				this.showAbout = !this.showAbout
			},
			getAbout(i) {
				uni.navigateTo({
					url: i.path
				})
			},
			close() {
				this.show = false
			},
			closeAbout() {
				this.showAbout = false
			}
		}
	}
</script>

<style lang="scss">
	.cont{
		position: fixed;
		top:0upx;
		left: 0;
		z-index: 1;
		width: 100%;
		background: #fff;
	}
	.bg-ffe{
		background: #ffe32a;
	}
	.cu-bar {
		height: 180upx;
		width: 100%;
		padding-top: 80upx;

	}
	.keyword {
		height: 90upx;
		line-height: 90upx;
	}
	.iconfont {
		font-size: 100upx;
	}
	.margin-right-100{
		padding-right: 100upx;
	}
	.about{
		display: flex!important;
		justify-content: space-between!important;
		// height: 100upx;
		// width: 100%;
	}
</style>
