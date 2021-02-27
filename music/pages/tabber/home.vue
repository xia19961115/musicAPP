<template>
	<view class="content">
		<HomeAppBar></HomeAppBar>
		<HomeBanner urlApi="/banner?type=2"></HomeBanner>
		<Category></Category>
		<SongsheetSlot>
			<template v-slot:songsheetCate>
				<view class="songsheet-cate">
					<view class="title">精品歌单</view>
					<view class="lookMore">查看更多</view>
				</view>
			</template>
			
			<template v-slot:songsheetItem>
				<view class="scroll-row">
					<scroll-view scroll-x="true" >
						<SongsheetItem 
						v-for="item in songsheetList1" 
						:key='item.id' 
						:isMarginLeft='true'
						:songsheetData="{
							id:item.id,
							name: item.name,
							pic: item.picUrl,
							playCount:item.playCount
							}"
						/>
					</scroll-view>
				</view>
			</template>
		</SongsheetSlot>
		
		<SongsheetSlot>
			<template v-slot:songsheetCate>
				<view class="songsheet-cate">
					<view class="title">每日推荐歌单</view>
					<view class="lookMore"></view>
				</view>
			</template>
			
			<template v-slot:songsheetItem>
				<view class="songsheetList">
					<SongsheetItem v-for="item in songsheetList2" :key='item.id' 
					:isMarginLeft='true'
					:songsheetData="{
						id:item.id,
						name: item.name,
						pic: item.coverImgUrl,
						playCount:item.playCount
						}"
					/>
				</view>
			</template>
		</SongsheetSlot>
		<!-- 下拉提示没有更多 -->
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import HomeAppBar from'@/components/home/HomeAppBar.vue'
	import HomeBanner from'@/components/home/HomeBanner.vue'
	import Category from'@/components/home/Category.vue'
	//外部插件 加载提示
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	
	//请求组件
	import {getPersonalized8,getRecommendSongSheet} from '@/common/api/Api.js'
	export default {
		data() {
			return {
				loadingType: '上拉加载更多',
				more: '上拉加载更多',
				loading: '正在加载...',
				nomore: '没有更多数据啦',
				//精品歌单
				songsheetList1: [],
				//每日推荐歌单
				songsheetList2: [],
				//加载页面的数据 起始为1
				offset: 1,
				//判断 上啦加载数据(true)   还是  下拉加载数据 (false)
				isRefresh: false
			}
		},
		components:{HomeAppBar,HomeBanner,Category,uniLoadMore},
		onLoad() {
			this.handleHomePersonalized()
			this.handleHomeRecommendSongSheet("华语",this.offset)
			//进入页面的时候 值为true 
			this.isRefresh=true
		},
		methods:{
			//请求精品歌单
			handleHomePersonalized(){
				getPersonalized8()
				.then((res)=>{
					this.songsheetList1= res[1].data.result;
				})
				.catch((err)=>{
					uni.showToast({
						icon: 'none',
						title: "请稍后尝试"
					})
				})
			},
			//请求每日推荐歌单
			handleHomeRecommendSongSheet:  async function(cat='华语',offset=1){
				try{
					const songsheetList = await getRecommendSongSheet(cat,offset)
					const list = songsheetList[1].data.playlists
					// console.log(typeof list)
					// console.log(songsheetList[1].data.playlists)
					//判断  是否有长度   如果有 就 拼接   然后再判断是否上啦 还是下拉
					if( this.songsheetList2.length && this.isRefresh){
						this.songsheetList2 = this.songsheetList2.concat(list)
						return
					}
					this.songsheetList2 =list
				}catch(err){
					uni.showToast({
						icon: 'none',
						title: "请稍后尝试"
					})
				}
			}
	
		},
		//下拉刷新 
		onPullDownRefresh (){
			this.isRefresh =false
			const offset = parseInt(Math.random()*30)
			this.handleHomeRecommendSongSheet('华语',offset)
			uni.stopPullDownRefresh()
		},
		//上拉页面
		onReachBottom() {
			// console.log("页面上啦了");
			this.loadingType = this.loading
			this.isRefresh = true
			//每次下拉 让offset 随机
			const offset = parseInt(Math.random()*30)
			this.handleHomeRecommendSongSheet('华语',offset)
			this.offset = offset
	

		},
	}
</script>

<style lang="scss" scoped>
	.content{
		overflow-x: hidden;
	.songsheet-cate {
			height: 70rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
		
			.title {
				font-size: 31rpx;
				color: #000;
				font-weight: bold;
			}
		
			.lookMore {
				font-size: 24rpx;
				padding: 8rpx;
				border: 1rpx solid #ddd;
				border-radius: 20rpx;
			}
		}
		
		
		.scroll-row{
			height: 270rpx;
			white-space: nowrap;
			overflow: hidden;
			
			.songItem{
				display: inline-block;
			}
		}
		
		
		.songsheetList{
			display: flex;
			flex-wrap: wrap;
			margin-left: 0rpx;
			justify-content:flex-start;
		}
	}
</style>
