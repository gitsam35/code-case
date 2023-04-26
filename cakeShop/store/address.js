import {$post,$get} from '@/utils/request.js';
export default{
	namespaced:true,
	state(){
		return{
			checkedIdx:-1,  //记录用户勾选的地址
			addressList:[]
		}
	},
	getters:{
		orderAddress(state){ //订单中的地址
			//根据checkedIdx与isdefault共同得到一个地址对象
			let {checkedIdx,addressList} = state
			if(checkedIdx!=-1){
				return addressList[checkedIdx]
			}
			// addressList.forEach((item,i)=>{
			// 	if(item[i].isdefault){
			// 		return item[i]
			// 	}
			// })
			for(let i=0;i<addressList.length;i++){
				if(addressList[i].isdefault){
					return addressList[i]
				}
			}
		}
	},
	mutations:{
		addressDefaultMut(state,idx){ //设为默认
			state.addressList.forEach((item,i)=>{
				if(i==idx){
					item.isdefault = true
				}else{
					item.isdefault = false
				}
			})
		},
		addressCheckMut(state,idx){ //选取新地址
			state.checkedIdx = idx
			uni.navigateBack({
				delta: 1
			});
		},
		addressAddMut(state,addresssObj){ //新增地址
			state.addressList.push(addresssObj)
		},
		addressInitMut(state,addressArr){ //初始化地址列表
			state.addressList = addressArr
		}
	},
	actions:{
		addressAddAct(context,addressObj){
			$post('/1.1/classes/address',addressObj).then(({objectId})=>{
				context.commit('addressAddMut',{
					...addressObj,objectId
				})
				uni.navigateBack({
					delta:1
				})
			})
		},
		addressInitAct(context,userid){
			let url = `/1.1/classes/address?where={"userid":"${userid}"}`
			$get(url).then(({results})=>{
				context.commit('addressInitMut',results)
				
			})
		}
	}
}