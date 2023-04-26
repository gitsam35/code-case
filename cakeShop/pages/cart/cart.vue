<template>
	<view>
		<view class="flex padding-sm" v-for="(item,index) in cartList" :key="index">
			<view class="flex align-center">
				<text @click="handleCheck(index)" class="iconfont icon-gouxuan" :class="item.ischeck?'color-yel':''"></text>

				<image class="poster margin-lr" :src="item.img" mode=""></image>
			</view>
			<view class="flex justify-between info">
				<view class="">
					{{item.name}}
					<view class="margin-tb-sm">
						{{item.french}}
					</view>
					￥{{item.price}}
				</view>
				<view class="flex flex-direction align-end">
					<view class="">
						<view @click="handleEdit(index)" class="edit margin-bottom-sm">
						<text class="iconfont icon-bianji"></text>
					</view>
					</view>
					
					{{item.weight}} ({{item.spec}})  x {{item.num}}
				</view>
			</view>
			
			<!-- 弹窗 -->
				<u-popup :show="show" mode="center" :round="20" :safeAreaInsetBottom="false">
			        <view class="bg-fff padding margin-lg">
			        	<view class="flex justify-between">
			        		<image class="poster margin-lr" :src="item.img" mode=""></image>
			        		<view class="">
			        			{{item.name}}
			        			<view class="margin-tb-sm">
			        				{{item.french}}
			        			</view>
			        			￥{{item.price}}
			        		</view>
			        	</view>
			        	<view class="flex justify-between padding-tb u-border-bottom">
			        		<view class="">
			        			商品重量
			        		</view>
			        		<view class="">
								{{item.weight}}
			        			({{item.spec}}) 
			        		</view>
			        	</view>
			        	<view class="flex justify-between padding-tb-sm u-border-bottom">
			        		<view class="">
			        			数量
			        		</view>
			        			<u-number-box 
									@change="handleNum"
									:v-model="value"
			        			    button-size="26"
			        			    bgColor="#ffe32a"
			        			    iconStyle="color: #fff"
			        			></u-number-box>
			        	</view>
			        	<view class="flex margin-top">
			        		<button class="bg-d9 cu-btn lg" @click="show = false">取消</button>
			        		<button @click="handleOk" class="bg-yel cu-btn lg">确认</button>
			        	</view>
			        </view>
				</u-popup>
		</view>

		<view class="fixed bg-fff flex">
			<view class="flex-sub flex align-center padding">
				<text @click="handleAllCheck(allInfo.allCheck)" class="iconfont icon-gouxuan margin-sm"
					  :class="allInfo.allCheck?'color-yel':''"></text>
				全选
				<view class="margin-left">
					共计：{{allInfo.allPrice}}元
				</view>
			</view>
			<view @click="handleOrder" class="bg-yel padding text-center">
				立即结算
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				show:false,
				cartIdx:0, //主商品序号
				num:1  ,//当前弹窗商品数量
				value:1
			};
		},
		computed: {
			...mapState({
				cartList: state => state.cart.cartList,
				userInfo: state => state.user.userInfo
			}),
			...mapGetters({
				allInfo:'cart/allInfo'
			})
		},
		methods: {
			...mapMutations({
				handleCheck: 'cart/cartCheckMut',
				handleAllCheck: 'cart/cartAllCheckMut',
			}),
			handleEdit(idx){ //编辑
				this.show=true
				this.cartIdx = idx
			},
			handleDelete(idx){ //删除

			},
			handleNum(e){
				this.num = e.value
			},
			handleOk(){ //弹窗确定
				this.show = false
				let {cartIdx,num} = this
				this.$store.commit('cart/cartListCheckMut',{cartIdx,num})
			},
			handleOrder(){
				uni.navigateTo({
					url: '/pagesA/order/order'
				})
			}
		},
		onShow() {
			if(this.userInfo){
				return
			}
			uni.showModal({
				title:'温馨提示',
				content:'您需要先登录才能进行您的操作',
				cancelText:'稍后再说',
				confirmText:'立即登录',
				success: (res) => {
					if(res.cancel){
						uni.switchTab({
							url:'/pages/cake/cake'
						})
						return
					}
					uni.navigateTo({
						url:'/pagesA/user/login'
					})
				}
			})
		}
	}
</script>

<style lang="scss">
	.poster {
		width: 180upx;
		height: 180upx;
	}

	.info {
		width: 60%;

		.edit {
			width: 90upx;
			height: 90upx;
			text-align: center;
			line-height: 90upx;
			background-color: #e6e6e6;
			border-radius: 50%;
		}
	}

	.fixed {
		position: fixed;
		bottom: 100upx;
		left: 0;
		width: 100%;
		height: 100upx;
	}

	.icon-gouxuan {
		color: #e6e6e6;
	}
	.cu-btn.lg{
		width: 50%;
	}
	.bg-yel{
		background-color:#ffe32a!important;
	}
	.bg-d9{
		background-color:#d9d9d9!important;
	}
</style>
