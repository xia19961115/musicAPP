<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">电台</block>
		</cu-custom>
		
		<HomeBanner urlApi='/dj/banner'/>
		
		<SongsheetSlot>
			<template v-slot:songsheetCate>
				<view class="songsheet-cate">
					<view class="title">榜单排行</view>
					<view class="lookMore"></view>
				</view>
			</template>
			
			<template v-slot:songsheetItem>
				<view class="scroll-row">
					<scroll-view scroll-x="true" >
						<SongsheetItem 
							v-for="item in djSongsheet" 
							:key='item.radios[0]["id"]' 
							:isMarginLeft="true"
							:songsheetData="{id:item.radios[0]['id'],name: item.radios[0]['name'],pic: item.radios[0]['picUrl'],playCount: item.radios[0]['playCount']}"
						/>
					</scroll-view>
				</view>
			</template>
		</SongsheetSlot>
		
		
		<view class="dj-list">
			<view 
				class="dj-list-item" 
				v-for="(item,index) in djTopLists" 
				:key="index"
				@click="handleGoToPlayPage(item.program.mainSong.id,item.program.name,item.program.dj.nickname)" 
			>
				<view class="dj-pic">
					<image
						mode="aspectFill"
						lazy-load
						:src="item.program.coverUrl"
					></image>
				</view>

				<view class="dj-list-info">
					<view class="dj-title">{{item.program.name}}</view>
					<view class="dj-user">
						<view class="dj-user-pic">
							<image
								lazy-load
								mode="aspectFill"
								:src="item.program.dj.avatarUrl"
							></image>
						</view>
						<view class="dj-user-name">
							{{item.program.dj.nickname}}
						</view>
						<view>
							<text class="iconfont icon-hot"></text>
							{{item.score}}
						</view>
					</view>
				</view>

				<text class="iconfont icon-play1-copy dj-play-btn"></text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {getHomeDjRecommend,getHomeDjToplist} from '@/common/api/Api.js'
	export default {
		data() {
			return {
				djTopLists: [],
				djSongsheet: []
			};
		},
		onLoad() {
			this.handleDjRecommend()
			this.handleGoToPlayPage()
		},
		methods: {
			//请求DJ列表数据
			handleGoToPlayPage: async function(id,name,author){
				const result = await getHomeDjToplist()
				// console.log(result[1].data);
				const list = result[1].data.data.list
				this.djTopLists = list
			},
			//请求榜单排行数据
			handleDjRecommend:async function(){
				const result = await getHomeDjRecommend()
				// console.log(result);
				const list = result[1].data.data
				this.djSongsheet = list
			},
			handleDjTopList: function(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>

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


.dj-list{
	margin-left: 35rpx;
	image{
		height: 100%;
		height: 100%;
	}
	.dj-list-item{
		height: 118rpx;
		display: flex;
		align-items: center;
		justify-content: space-evenly;

		.dj-pic{
			width: 96rpx;
			height: 96rpx;
			border-radius: 10rpx;
			overflow: hidden;
			// background-color: #f00;
			
			image{
				height: 100%;
				height: 100%;
			}
		}

		.dj-list-info{
			width: 500rpx;
			height: 100%;
			color: #666;
			font-size: 26rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;

			.dj-title{
				color: #333;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.dj-user{
				font-size: 18rpx;
				display: flex;

				.dj-user-pic{
					width: 30rpx;
					height: 30rpx;
					border-radius: 50%;
					overflow: hidden;
				}
				.dj-user-name{
					margin: 0 13rpx;
				}
			}
		}

		.dj-play-btn{
			font-size: 46rpx;
		}
	}

}
</style>


