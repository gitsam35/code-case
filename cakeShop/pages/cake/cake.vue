<template>
	<view class="content">
		<view class="margin-t-180">
			<nav-custom></nav-custom>
		</view>
		<view class="flex flex-wrap justify-between padding-sm margin-bottom">
			<good-item v-for="(item,index) in goodsList" :key="item.index" :goodsList='item'>
			</good-item>
		</view>
		<nav-category></nav-category>
		
		
	</view>
</template>

<script>
	
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				show: false,
				listShow: false,
				classfiyList: [],
				sceneShow: false,
			};
		},
		computed: {
			...mapState({
				cond:state=>state.goods.cond,
				page:state=>state.goods.page,
				goodsList:state=>state.goods.goodsList,
				
			})
		},
		mounted() {
			this.loadData()
		},
		onLoad() {
		},
		onReachBottom() {
			this.loadData()
		},
		onPullDownRefresh() {
			this.$store.commit('goods/initMut')
			this.loadData()
		},
		methods: {
			
			loadData() {
				let obj ={}
				obj.skip = this.page * 6;
				obj.wh = JSON.stringify(this.cond)
				this.$store.dispatch('goods/handleGoodsListAct',obj)
			},
			reloadData() { //刷新页面数据
			},

			

		}
	}
</script>

<style lang="scss">

	.h180{
		height:180upx;
	}
	.margin-t-180{
		margin-top: 180upx;
	}
	.tab-arr {
		font-size: 22upx;
		height: 110upx;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		box-shadow: 0 0 10upx 2upx rgba(0, 0, 0, 0.1);
	}
	.pop-cont {
		width: 400upx;
		margin-top: 200upx;
	}
	.no{
		height: 750upx;
		display: flex;
		    /* 默认水平居中 */
		justify-content: center; 
		    /* 垂直居中 */
		align-items: center;
	}

</style>
