<script>
	export default {
		onLaunch: function() {
			
			try {
				// 尝试提取本地存储用户信息
				const value = uni.getStorageSync('userInfo');
				if (value) {
					// 登录成功后把用户信息保存到vuex状态机中
					this.$store.commit('user/initInfo',value)
					// 为查询用户收货地址提供value.objectId
					this.$store.dispatch('address/addressInitAct',value.objectId)
				}
			} catch (e) {
				// error
			}
		},
		onShow: function() {
		},
		onHide: function() {
		}
	}
</script>

<style lang="scss">
	// 自定义的样式
	
	.fw-700{
		font-weight: 700;
	}
	// 项目背景颜色
	.bg-fff{
		background-color: #FFFFFF!important;
	}
	.color-7f{
		color: #7f7f7f; 
	}
	.color-fff{
		color: #ffffff!important;
	}
	.color-yel{
		color: #ffe32a!important;
	}
	page {
		background-color: #fff;
	}
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	@import 'uview-ui/theme.scss';
	@import '@/pagesA/colorui/main.css';
	@import '@/pagesA/colorui/icon.css';

	
	

</style>
