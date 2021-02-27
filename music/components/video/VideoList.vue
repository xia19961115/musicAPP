<template>
	<view class="videoList">
		<view v-for="(item,index) in videoList" :key="item.data.vid">
			<view class="videoplay">
				<view class="video-con">
					<VideoEle :poster="item.data.coverUrl" :vid="item.data.vid"></VideoEle>
				</view>
				<view class="title">
					<text>{{item.data.title}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getVideoCatePlayList} from '@/common/api/Api.js'
	import VideoEle from './VideoEle.vue'
	export default {
		components:{
			VideoEle
		},
		props:['vid'],
		data() {
			return {
				videoList:[]
			};
		},
		created() {
			this.handleGetVideoCatePlayList(this.vid)
		},
		methods:{
			handleGetVideoCatePlayList: async function (id){
				try{
					const result = await getVideoCatePlayList(id)
					// console.log(result[1].data.datas)
					const list =result[1].data.datas
					this.videoList =list
				}catch(e){
					console.log(err);
				}
			}
		},
		watch:{
			vid(newvlaue,oldvalue){
				console.log(newvlaue);
				this.handleGetVideoCatePlayList(newvlaue)
			}
		}
	}
</script>

<style lang="scss" scoped>
	// .videoList{border: 1rpx solid blue;}
	.videoplay{
	    padding: 15rpx 30rpx;
	    background-color: #fff;
	    margin: 25rpx 0;
	
	    .video-con {
	        border-radius: 40rpx;
	        overflow: hidden;
	    }
	
	    .title{
	        font-size: 25rpx;
	        color: #454545;
	        margin: 20rpx 0;
	    }
	
	
	}

</style>
