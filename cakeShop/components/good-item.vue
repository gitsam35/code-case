<template>
	<view class="cake-item">
		<image  class="poster" @click="handleDetail" :src="goodsList.img" mode=""></image>
		
		<view class="info-cont">
			<view class="info flex align-center justify-between margin-xs">
				<view class="title padding-xs">
					<view >
						<view class="fs-20 color-7f">
							{{goodsList.fname}}
						</view>
						<view class="fs-24 fw-700">
							{{goodsList.name}}
						</view>
						
					</view>
					<view class="fs-22 ">
						<text>￥</text>
						{{goodsList.price}}
					</view>
				</view>
				<view @click="handleAddCart" class="cart-btn margin-right-sm">
					<text class="iconfont icon-gouwuche"></text>
				</view>
				
			</view>
		</view>
	</view>
	</template>

<script>
	// 引入个人的iconfont图标
	import  '@/static/css/iconfont.css';
	export default {
		name:"good-item",
		props:['goodsList'],
		data() {
			return {
				
			}
		},
		methods: {
			handleDetail(){
				uni.setStorage({
					key:'detail',
					data:this.goodsList,
					success: () => {
						uni.navigateTo({
							url:'/pagesA/detail/detail'
						})
					}
				})
				
			},
			handleAddCart(){
				this.$store.commit('cart/cartAddMut',{...this.goodsList,idx:0})
				uni.switchTab({
					url:'/pages/cart/cart'
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #fff;
	}
	.cake-item {
		width: 346upx;
		.poster {
			height: 330upx;
		}

		.fs-28 {
			margin-top: 24upx;
		}

		.fs-16 {
			margin: 14upx 0;
		}

		.fs-18 {
			margin-bottom: 22upx;
		}
		.title{
			width: 260upx;
		}
		.cart-btn {
			width: 80upx;
			height: 80upx;
			border-radius: 50%;
			background-color: #ffe32a;
			text-align: center;
			line-height: 80upx;
		}
	}
</style>
