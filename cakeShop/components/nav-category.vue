<template>
	<view>
		<!-- 商品类别 -->
		<view class="tab-arr flex justify-center bg-fff padding">
			<view class="flex justify-center align-center" v-for="(item,index) in tabArr" :key="index"
				@click="handleTab(item)">
				<view class="tab-name">
					{{item.name}}
				</view>
				<u-line v-if="index !== tabArr.length-1"  direction="col" length="20" color="#ffe32a" margin="30upx"></u-line>
				
				
			</view>
		</view>
		<u-popup :show="show" mode="left" @close="popupClose" >
			<view class="pop-cont">
				<view class="" v-for="(item,index) in classfiyList" :key="index">  
				<view @click="handleList(item,0)" :title="item.tname"
					class="padding margin-left u-border-bottom ">
					{{item.bname}}
				</view>
					<view v-if="index==0">
						<view @tap="listShow=!listShow" class="screen padding ">
							口味筛选
						</view>
						<u-cell-group v-if="listShow" class="text-center">
							<u-cell v-for="(itm,inx) in item.list" :key="inx" :title="itm.tname" isLink
								@click="handleList(itm,1)"></u-cell>
						</u-cell-group>
						<view @tap="sceneShow=!sceneShow" class="screen padding u-border-top">
							场景筛选
						</view>
						<u-cell-group v-if="sceneShow" class="text-center">
							<u-cell v-for="(itm,inx) in item.scene" :key="inx" :title="itm.tname" isLink
								@click="handleList(itm,2)"></u-cell>
						</u-cell-group>
					</view>
		
				
				</view>
			</view>
		</u-popup>
		
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		name:"nav-bottom",
		data() {
			return {
				tabArr: [
					{
						name: '分类',
						bcid: '',
						target: ''
					},
					{
						name: '蛋糕',
						bcid: 1,
						target: '/pages/cake/cake'
					},
					{
						name: '面包',
						bcid: 11,
						target: '/pages/bread/bread'
					},
					{
						name: '小食',
						bcid: 6,
						target: '/pages/food/food'
					},
				],
				show:false, //类别弹出框
				classfiyList: [],
				listShow: false, //口味弹出框
				sceneShow: false,
			};
		},
		created() {
			let url = '/1.1/classes/classify';
			this.$get(url).then(res => {
				this.classfiyList = res.results
			})
		},
		computed:{
			...mapState({
				page: state => state.goods.page,
				cond: state => state.goods.cond,
			}),
		},
		methods:{
			handleTab(item) { 
				let {
					bcid,
					target
				} = item
				if (bcid) { //切换后商品列表的更新
					this.$store.commit('goods/changeCondition', {
						bcid
					})
					this.$store.commit('goods/initMut')
					let obj ={}
					obj.skip = this.page * 6;
					obj.wh = JSON.stringify(this.cond)
					this.$store.dispatch('goods/handleGoodsListAct',obj)
				}
				if (!bcid && !target) {
					this.show = true
				}
				if (!bcid && target) {
					uni.navigateTo({
						url:target
					})
				}
			},
			handleList({
				bid,
				tid
			},type) { // 口味、场景筛选
				let obje = {bcid:bid}
				if(type===1){obje.fid = tid}
				if(type===2){obje.sid = tid}
				this.$store.commit('goods/changeCondition', obje)
				this.$store.commit('goods/initMut')
				let obj ={}
				obj.skip = this.page * 6;
				obj.wh = JSON.stringify(this.cond)
				this.$store.dispatch('goods/handleGoodsListAct',obj)
				this.show=false
				uni.showToast({
				    title: '筛选成功',
				    //显示持续时间为 2秒
				    duration: 1500
				})
			},
			popupClose() {
				this.show = false
			},
		}
	}
</script>

<style lang="scss">
	.tab-arr {
		font-size: 22upx;
		height: 70upx;
		position:fixed;
		top: 170upx;
		left: 0;
		width: 100%;
		box-shadow: 0 0 10upx 2upx rgba(0, 0, 0, 0.2);
	}
	.tab-name{
		width: 100upx;
		font-size: 26upx;
		text-align: center;
		margin: 0 10upx;
	}
	.screen{
		margin-left:60upx;
		font-size: 24upx;
	}
	.pop-cont {
		width: 400upx;
		margin-top: 200upx;
		.cell{
			margin-bottom: 1upx;
		}
	}
</style>