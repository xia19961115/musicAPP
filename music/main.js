import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
import SongsheetSlot from '@/components/global/SongSheetSlot.vue'
import SongsheetItem from '@/components/global/SongsheetItem.vue'
import HomeBanner from './components/home/HomeBanner.vue'
import store from "store/store.js"


Vue.config.productionTip = false

//注册全局组件   括号内(第一个参数全局组件标签名字,第二个参数引入组件的文件)
Vue.component('cu-custom',cuCustom)
Vue.component('SongsheetSlot',SongsheetSlot)
Vue.component('SongsheetItem',SongsheetItem)
Vue.component('HomeBanner',HomeBanner)

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
	
})
app.$mount()
