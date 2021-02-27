<template>
	<view>
		<view class="bg-gradual-orange radius text-center shadow-blur">
			<!-- //撑开安全高度 -->
			<view :style="[{height: StatusBar+'px'}]"></view>
			<view class="cu-bar  search">
				<view v-if='img' class="cu-avatar round" :style='`background-image:url(${img})`'></view>
				<view class="search-form round" @click="goToSearchBar()">
					<text class="cuIcon-search"></text>
					<input disabled :adjust-position="false" type="text" placeholder="星辰大海 黄霄雲" confirm-type="search"></input>
				</view>
				<view class="action" @click="getAdress">
					<text>{{adress}}</text>
					<text class="cuIcon-triangledownfill"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img:'',
				adress:'北京',
			};
		},
		created() {
			this.getAdress()
		},
		methods:{
			//自动获取地理位置 APP支持
			getAdress(){
				const self =this
				uni.getLocation({
					type:"gcj02",
					altitude: true,
					geocode: true,
					success: (res) => {
						if(res.address.province.slice(0,2) === '内蒙'){
							self.adress='内蒙古'
						}else{
							self.adress=res.address.province.slice(0,2)
						}
					}
				})
			},
			//跳转到搜索页面
			goToSearchBar(){
				uni.navigateTo({
					url:'/pages/home/search'
				})
			}
		}
	}
</script>

<style scoped>
	
</style>
