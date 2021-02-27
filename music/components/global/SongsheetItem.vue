<template>
	<view
		class="songItem"
		:class="[isMarginLeft?'isMarginLeft':'']"
		@click="handleClick(songsheetData.id,songsheetData.name)"
		v-if="handleIsSongsheetData"
	>
	
		<view class="songInfo">
			<image
				lazy-load
				class="pic"
				:src="songsheetData.pic"
				mode="aspectFill"
			></image>
			<view class="info">
				<text class="iconfont icon icon-icon-"></text>
				<text class="num" playCount>{{songsheetData.playCount | numberFormat}}</text>
			</view>
		</view>
		<view class="songTitle" name>{{songsheetData.name}}</view>
	</view>
</template>

<script>
	// yarn 引入数字筛选
	import {numberFormat} from 'js-num-format'
	export default {
		
		data() {
			return {
				
			};
		},
		filters:{numberFormat},
		props:['isMarginLeft','songsheetData'],
		computed: {
			handleIsSongsheetData: function(){
				const len = JSON.stringify(this.songsheetData)
				const b = (len && len.length >2) ? true : false
				return b 
			}
		},
		methods: {
			handleClick(id,name){
				uni.navigateTo({
					url:'/pages/home/songslist?id='+id+'&name='+name
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

.songItem{
	width: 210rpx;
	// margin-left: 30rpx;
	// height: 286rpx;
	// border: 1px solid red;
	overflow: hidden;
	
	&.isMarginLeft{
		margin-left: 30rpx;
	}
	
	.songInfo{
		width: 210rpx;
		height: 210rpx;
		position: relative;
		border-radius: 10rpx;
		overflow: hidden;
		
		.pic{
			width: 210rpx;
			height: 210rpx;
			overflow: hidden;
			border-radius: 10rpx;
		}

		.info{
			position: absolute;
			right: 0;
			top: 10rpx;
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: white;
			
			.icon{
				font-size: 20rpx;
			}

			.num{
				
				margin-right: 10rpx;
			}
		}
	}
	

	.songTitle{
		flex: 1;
		font-size: 24rpx;
		padding-top: 5rpx;
		min-height: 44rpx;
		color: #393939;
		overflow : hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
</style>
