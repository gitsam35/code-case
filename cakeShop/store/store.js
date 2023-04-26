import Vue from "vue"
import Vuex from 'vuex'
import goods from '@/store/goods.js';
import user from '@/store/user.js';
import cart from '@/store/cart.js';
import address from '@/store/address.js';
Vue.use(Vuex)
const store = new Vuex.Store({
	state:{
		nu:10
	},
	mutations:{
		changeNu(state,step){
			state.nu += step
		}
	},
	actions:{
		addNu(context,step){
			setTimeout(()=>{
				context.commit('changeNu',step)
			},1000)
		}
	},
	modules:{
		goods,
		user,
		cart,
		address,
	}
})
export default store