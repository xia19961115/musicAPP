<script>
	import {mapMutations} from "vuex"
	export default {
		globalData:{
			
		},
		//中间适配按钮点击
		onLaunch: function() {
			uni.onTabBarMidButtonTap(function(){
				uni.navigateTo({
					url:"/pages/tabber/video"
				})
			})
			
		//引入外部 获取设备安全高度	
		uni.getSystemInfo({
			success: function(e) {
				// #ifndef MP
				Vue.prototype.StatusBar = e.statusBarHeight;
				if (e.platform == 'android') {
					Vue.prototype.CustomBar = e.statusBarHeight + 50;
				} else {
					Vue.prototype.CustomBar = e.statusBarHeight + 45;
				};
				// #endif
				// #ifdef MP-WEIXIN
				Vue.prototype.StatusBar = e.statusBarHeight;
				let custom = wx.getMenuButtonBoundingClientRect();
				Vue.prototype.Custom = custom;
				Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
				// #endif		
				// #ifdef MP-ALIPAY
				Vue.prototype.StatusBar = e.statusBarHeight;
				Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
				// #endif
				
			}
		})
			
		this.setAudioContext()
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			...mapMutations(['setAudioContext'])
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './colorui/icon.css';
	@import './colorui/main.css';
	@import './common/fonts/iconfont.css';
</style>
