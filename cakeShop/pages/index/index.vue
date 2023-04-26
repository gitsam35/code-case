<template>
	<view class="contont">
		<nav-custom class="margin-t-100"></nav-custom>
		<swiper class="banner" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" indicator-color="#fff" indicator-active-color="#ffe32a">
			<swiper-item v-for="(item,index) in banner" :key="item.id" @click="handleBanner(item.link)">
				<view class="swiper-item">
					<image :src="item.img" mode="" ></image>
				</view>
			</swiper-item>
		</swiper>
		<nav-custom ></nav-custom>
		<home-title 
		topTitle="本季推荐" 
		bottomTitle="Seasonal Recommend" 
		rightTitle="Seasonal" 
		></home-title>
		<scroll-view scroll-x="true">
			<view class="scroll-image">
				<image src="https://mcake-oss.oss-cn-hangzhou.aliyuncs.com/file/b9d378e1be959376/d943a30b6ebdaa1a.jpg" mode="heightFix"></image>
				<image src="https://mcake-oss.oss-cn-hangzhou.aliyuncs.com/file/384958756aa24c39/a79e9f22046ab26c.jpg" mode="heightFix"></image>
				<image src="https://mcake-oss.oss-cn-hangzhou.aliyuncs.com/file/e06c45a0d13fa946/681400bc21dee76a.jpg" mode="heightFix"></image>
			</view>
		</scroll-view>
		
		<home-title 
		topTitle="法式经典" 
		bottomTitle="French Classics" 
		rightTitle="French" 
		></home-title>
		
		<image
		 class="classify" src="https://mcake-oss.oss-cn-hangzhou.aliyuncs.com/file/002d8ec99b74dccd/15c31d4729a3eecc.jpg" mode=""></image>
	</view>
	
</template>

<script>
	import {$http} from '../../utils/request.js'
	export default {
		data() {
			return {
				banner:[]
			}
		},
		onLoad() {
			this.$get('/1.1/classes/banner').then(res=>{
				
				this.banner=res.results;
				})
		},
		methods: {
			handleBanner(link){
				uni.navigateTo({
					url:`./banner-ad?link=${link}`
				})
			}
		}
	}
</script>

<style lang="scss">
.contont{
	margin-top: 160upx;
}

.banner{
	height: 800upx;
	image{
		width: 100%;
		height: 800upx;
	}
}
.scroll-image{
	white-space:nowrap;
	image{
		height:290upx;
		width: auto;
	}
}
.classify{
	height:380upx;
	width: 100%;
}
</style>
