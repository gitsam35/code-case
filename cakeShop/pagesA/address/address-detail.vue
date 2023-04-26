<template>
	<view>
						<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers">
						</map>
		<form @submit="handleSubmit">
			<view class="cu-form-group margin-top">
				<view class="title">
					<text class="cuIcon-friendfill"></text>
				</view>
				<input name="username" value="张三" class="text-right" placeholder="请输入姓名"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">
					<text class="cuIcon-mobilefill"></text>
				</view>
				<input name="phone" value="13988885555" class="text-right" placeholder="请输入电话"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">
					<text class="cuIcon-locationfill"></text>
				</view>
				<picker :range="regionArr" @change="handleRegion">
					<view class="picker">
						{{regionIdx==-1?'请选择区域':regionArr[regionIdx]}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">
					<text class="cuIcon-locationfill"></text>
				</view>
				<input name="detail" value="平安大厦" class="text-right" placeholder="请输入详细地址"></input>
			</view>
			<view class="padding">
				<button form-type="submit" class="cu-btn bg-brown block">
					确定
				</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				regionArr:[
					'青秀区',
					'良庆区',
					'江南区',
					'西乡塘区',
				],
				regionIdx:-1,
				id:0, // 使用 marker点击事件 需要填写id
							title: 'map',
							latitude: 39.909,
							longitude: 116.39742,
							covers: [{
								latitude: 39.909,
								longitude: 116.39742,
								iconPath: '../../../static/location.png'
							}, {
								latitude: 39.90,
								longitude: 116.39,
								iconPath: '../../../static/location.png'
							}]
			};
		},
		computed: {
			...mapState({
				userInfo:state=>state.user.userInfo
			})
		},
		methods: {
			handleRegion(ev){
				let {value} = ev.detail
				this.regionIdx = value
			},
			handleSubmit(ev){
				let {value} = ev.detail
				let {regionArr,regionIdx} = this
				value.city = '南宁市'
				value.region = regionArr[regionIdx]
				value.isdefault = false
				value.userid = this.userInfo.objectId
				this.$store.dispatch('address/addressAddAct',value)
			}
		}
	}
</script>
	
<style lang="scss">
.map{
	height: 400upx;
	width: 750rpx;
}
</style>
