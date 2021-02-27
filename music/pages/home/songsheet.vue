<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">歌单广场</block>
		</cu-custom>
		
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" 
			v-for="(item,index) in songsheetCate" 
			:key="index" 
			@tap="tabSelect" 
			:data-id="index"
			:data-name='item'
			>
				{{item}}
			</view>
		</scroll-view>
		
		<SongsheetSlot>
			
			<template v-slot:songsheetItem>
				<view class="songsheetList">
					<SongsheetItem 
					v-for="item in songsheetList" 
					:key='item.id'
					:songsheetData="{id:item.id,name:item.name,pic:item.coverImgUrl,playCount:item.playCount}"
					/>
				</view>
			</template>
		</SongsheetSlot>
	</view>
</template>

<script>
	// import mixin from '@/common/utils/mixis.js'
	import {getHomeSongSheetsCate,getRecommendSongSheet} from '@/common/api/Api.js'
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				tags: 10,
				songsheetCate: [],
				songsheetList: [],
				name: ''
			};
		},
		onLoad() {
			this.handleSongsheetCate()
		},
		// mixins: [mixin,],
		methods: {
			//列表事件
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				const name = e.currentTarget.dataset.name;
				// console.log(name);
				this.getSongsheetList(name)
			},
			//标题列表请求
			handleSongsheetCate: async function(){
				try{
					const result = await getHomeSongSheetsCate()
					// console.log(result[1].data.tags)
					const list =result[1].data.tags
					const listArr = list.map((item)=>{
						return item.name
					})
					this.songsheetCate =listArr
					this.getSongsheetList()
				}catch(err){
					console.log(err);
				}
			},
			//数据列表请求
			getSongsheetList: async function (name='华语'){
				try{
					const list = await getRecommendSongSheet(name)
					// console.log(list[1].data.playlists)
					this.songsheetList =list[1].data.playlists
					
				}catch(err){
					console.log(err);
				}
			}
		},
	}
</script>

<style lang="scss">
	.songsheetList{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
</style>
