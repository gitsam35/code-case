import {$post,$get} from '@/utils/request.js';
export default{
	namespaced:true,
	state:{
			cond:{
				 bcid:1, // 商品分类条件
			},
			page:0,
			goodsList:[],
	},
	mutations:{
		changeCondition(state,obj){ //商品分类条件
			state.cond = obj
		},
		initGoodsListMut(state,results){ //获取到的goodsList数据
			state.goodsList=[...state.goodsList,...results]
		},
		changeGoodsList(state,arr){ //获取到的goodsList数据
			
			state.goodsList=arr
		},
		changePageMut(state){
			state.page++
		},
		initMut(state){
			state.goodsList=[]
			state.page=0
		},
	},
	actions:{
		handleGoodsListAct(context,obj){ //获取商品数据
		let url = `/1.1/classes/goods?where=${obj.wh}&limit=6&skip=${obj.skip}`
		$get(url).then(({results})=>{
			if (results.length !== 0) { //res有数据再拼接加数据
			context.commit('changePageMut')
			context.commit('initGoodsListMut',results)
				return
			}else {
				uni.showToast({
				    title: '无更多商品',
				    //显示持续时间为 1.5秒
				    duration: 1500
				})
					}
		})
		}
	}
}