<template>
		<view class="padding flex justify-between align-center">
			<view class="flex align-center">
				<text class="cuIcon-edit margin-right"></text>
				<view >
					<view class="fs28 fw-700">
						{{topTitle}}
					</view> 
					<view class="fs14 color-7f">{{bottomTitle}}</view>
				</view>
			</view>
			<view class="color-7f">
			{{rightTitle}}
			</view>
		</view>
</template>

<script>
	export default {
		name:"home-title",
		props:['topTitle','bottomTitle','rightTitle'],
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.cuIcon-edit{
	font-size: 60upx
}

</style>