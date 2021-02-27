<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{title}}</block>
		</cu-custom>
		
		<view>
			<view
			 class="cu-list menu-avatar" 
			 v-for='(item,index) in songsList' 
			 :key='item.id'
			 @click="handleGoToPlayPage(index,item.id,item.name,(item.artists&&item.artists[0]['name']) || (item.ar&&item.ar[0]['name']),item.al?(item.al && item.al.picUrl) || item.album.artist.img1v1Url:'https://img.yzcdn.cn/vant/cat.jpeg')"
			 >
				<view class="cu-item">
					<view class="cu-avatar round lg" :style="`background-image:url(${(item.al && item.al.picUrl)|| item.album.artist.img1v1Url});`"></view>
					<view class="content flex-sub">
						<view>{{item.name}}</view>
						<view class="text-gray text-sm flex justify-between">
							<view  v-if="item.artists"> {{item.artists[0].name}} - {{item.album.name}} </view>
							<view  v-else-if="item.al"> {{item.ar[0].name}} - {{item.al.name}} </view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {mapMutations,mapActions} from"vuex"
	import {getTodayRecommendSongList,getHomeSongSheetsDetail} from '@/common/api/Api.js'
	export default {
		data() {
			return {
				title: '每日推荐',
				songsList: [],
			};
		},
		onLoad(option) {
			// console.log(option)
			const {id,name} = option
			if(name){
				this.title = name
			}
			if(id){
				this.handlegetHomeSongSheetsDetail(id)
				return
			}
			
			
			this.handleRecommendSongList()
		},
		methods: {
			...mapMutations(['playSong']),
			...mapActions(['getMusicLyric']),
			//请求数据列表
			handleRecommendSongList: async function (){
				try{
					const list = await getTodayRecommendSongList()
					// console.log(list[1].data.data.dailySongs)
					this.songsList =list[1].data.data.dailySongs
				}catch(err){
					uni.showToast({
						icon: 'none',
						title: err
					})
				}
			},
			//点击对应的列表 请求数据内容
			handlegetHomeSongSheetsDetail: async function(id){
				try{
					const res = await getHomeSongSheetsDetail(id)
					const list = res[1]['data']['playlist']['tracks']
					// console.log()
					this.songsList = list
				}catch(err){
					console.log(err);
				}
			},
			
			
			//点击去播放页面 
			handleGoToPlayPage: async function(index,id,name,author,pic){
				//共享当前状态
				this.$store.commit('setPlayerList',{
					// 绑定index是让数据在数据中心能知道下一首
					index,
					//知道对应页面的歌曲列表
					list:this.songsList
				})
				//请求
				const r = await this.$store.dispatch('getMusicUrl',{
					id,name,author,pic
				})
				if( !r ){
					uni.showToast({
						title: '此歌曲无版权，无法播放',
						icon: 'none',
					})
					return
				}
				//获取歌词
				await this.getMusicLyric(id)
				//播放音乐
				await this.playSong()
				//跳转放页面
				await uni.navigateTo({
					url:"/pages/home/player"
				})
			}
		},
	}
</script>

<style lang="scss">

</style>
