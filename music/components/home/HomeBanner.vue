<template>
	<view class="banner">
	<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
	 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
	 indicator-active-color="#0081ff">
		<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
			<view class="swiper-item" @click="handlePreviewImage(index)">
				<image 
				lazy-load
				:src="item" 
				mode="aspectFill" 
				></image>
				
			</view>
		</swiper-item>
	</swiper>
	</view>
</template>

<script>
	import {getBanner} from '@/common/api/Api.js'
	export default {
		data() {
			return {
				cardCur: 0,
				swiperList: [],
				dotStyle: false,
				towerStart: 0,
				direction: ''
			};
		},
		props:['urlApi'],
		created() {
			this.TowerSwiper('swiperList');
			// 初始化towerSwiper 传已有的数组名即可
			this.getBannerData()
			// console.log(this.urlApi);
		},
		methods: {
			//发送请求获取数据
			getBannerData: async function (){
				try{
					const banner = await getBanner(this.urlApi)
					// console.log(banner)
					//第一个数据在banners中  第二个数据在data中
					const list =banner[1].data.banners || banner[1].data.data
					//遍历图片返回
					const arrList =list.map((item)=>{
						return item.pic
					})
					//重新赋值
					this.swiperList = arrList
				}catch(err){
					uni.showToast({
						icon: 'none',
						title: '网络异常，请重试'
					})
				}
				
			},	
			//点击图片预览
			handlePreviewImage: function(index){
				const self =this 
				uni.previewImage({
					//传递图片的路径
					urls:self.swiperList,
					//对应的下标
					current: index,
					fail:(err) => {
						console.log(err);
					}
				})
			},
			
			
			
			
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			// towerSwiper
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},
	
			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},
	
			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},
	
			// towerSwiper计算滚动
			TowerEnd(e) {
				let direction = this.direction;
				let list = this.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < this.swiperList.length; i++) {
						this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
						this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
					}
					this.swiperList[list.length - 1].mLeft = mLeft;
					this.swiperList[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = this.swiperList.length - 1; i > 0; i--) {
						this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
						this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
					}
					this.swiperList[0].mLeft = mLeft;
					this.swiperList[0].zIndex = zIndex;
				}
				this.direction = ""
				this.swiperList = this.swiperList
			},
		}
	}
</script>

<style lang="scss">
	.banner{
		padding: 0 15rpx 0;
		height: 310rpx;
		overflow: hidden;
		margin-top: 20rpx;
	}
	image{
		height: 260rpx;
		border-radius: 15rpx;
	}
</style>
