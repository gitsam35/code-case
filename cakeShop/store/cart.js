import Vue from 'vue';
export default {
	namespaced: true,
	state() {
		return {
			cartList: []
		}

	},
	getters:{
		allInfo(state){ // 统计信息
			let allCheck = true
			let allPrice = 0
			state.cartList.forEach(item=>{
				if(!item.ischeck){
					allCheck = false;
				}
				if(item.ischeck){
					allPrice += item.list[item.idx].price * item.num;
				}
			})
			return {
				allCheck,allPrice
			}
		}
	},
	mutations: {
		cartCheckMut(state,index) { // 单选
			state.cartList[index].ischeck = !state.cartList[index].ischeck
		},
		cartAllCheckMut(state,bool){ // 全选
			state.cartList.forEach(item=>{
				item.ischeck = !bool
			})
		},
		cartListCheckMut(state,{cartIdx,num}){ //确认数量处理
			state.cartList[cartIdx].num = num
		},
		cartAddMut(state,goodObj){  //新增商品
			
			let {cartList} = state
			let len = cartList.length
			for(let i=0;i<len;i++){
				let {id,idx} = goodObj
				if(cartList[i].id==id&&cartList[i].idx==idx){ //购物车已经有相同商品
					state.cartList[i].num++
					return
				}
			}
			Vue.set(goodObj,'ischeck',true)
			Vue.set(goodObj,'num',1)
			state.cartList.push(goodObj) //新增新商品
		},
		cartDelMut(state,goodObj){  //新增商品
			
			let {cartList} = state
			// 响应式数据挂载
			Vue.set(goodObj,'ischeck',true)
			Vue.set(goodObj,'num',1)
			state.cartList.pop(goodObj) //新增新商品
		}
	}
}
